import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { climbs, rungsIn } from "@akasha/readout-system/readout-tier"
import { sleepIn } from "@akasha/readout-system/upkeep-sleep"
import { surplusIn } from "@akasha/readout-system/upkeep-surplus"
import { onTheWorkstation } from "@tools/lib/push-notification/store"
import { dayValuesByDate } from "@tools/lib/tracking/day-place"
import { isTierColor, type Rung } from "../surplus-fall-tier/surplus-fall-tier.module.code.ts"

export const SLEEP_HOURS_KEY = "sleep-hours"

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
}

const READOUT_PAGE_TYPE_SLUG = "readout"

const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"

type Values = Readonly<Record<string, unknown>>

function stated(held: unknown): string | null {
  return typeof held === "string" && held !== "" ? held : null
}

async function rowsOf(query: Query, doing: string): Promise<readonly Values[]> {
  const asked = await askingFor(query, onTheWorkstation)
  if ("refused" in asked) throw new Error(`${doing}: ${asked.refused}`)
  return asked.rows as readonly Values[]
}

export async function rungsOf(scaleSlug: string): Promise<readonly Rung[]> {
  const rows = await rowsOf(
    {
      pageTypeSlug: READOUT_SCALE_PAGE_TYPE_SLUG,
      where: { slug: { is: scaleSlug } },
    },
    `rungsOf: the readout scale \`${scaleSlug}\` went unread, so no reading can be placed on a rung`
  )
  const [row, ...rest] = rows
  if (row === undefined) {
    throw new Error(
      `rungsOf: no \`${READOUT_SCALE_PAGE_TYPE_SLUG}\` page answers to \`${scaleSlug}\`, and a fall is said in the rungs a scale states`
    )
  }
  if (rest.length > 0) {
    throw new Error(
      `rungsOf: ${rows.length} \`${READOUT_SCALE_PAGE_TYPE_SLUG}\` pages answer to \`${scaleSlug}\`, and nothing says which of them the fall is read against`
    )
  }
  const rungs: Rung[] = []
  for (const rung of rungsIn(row)) {
    if (!isTierColor(rung.color)) {
      throw new Error(
        `rungsOf: the readout scale \`${scaleSlug}\` states a \`${rung.color}\` rung, and a fall is said in the five colors a tier carries`
      )
    }
    rungs.push({ at: rung.at, color: rung.color })
  }
  if (!climbs(rungs)) {
    throw new Error(
      `rungsOf: the readout scale \`${scaleSlug}\` states ${rungs.map((rung) => rung.color).join(", ")}, which does not climb from black through blue, so nothing on it says that a lower reading is the worse one`
    )
  }
  return rungs
}

function stilled(row: Values): boolean {
  return row.enabled === false
}

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const rows = await rowsOf(
    {
      pageTypeSlug: READOUT_PAGE_TYPE_SLUG,
      where: { groupSlugs: { has: groupSlug } },
    },
    `resolveOneReadout: the readouts of the group \`${groupSlug}\` went unread, so what is being watched is unknown`
  )
  const drawn = rows.filter((row) => !stilled(row))
  const [row, ...rest] = drawn
  if (row === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${drawn.length} readouts, and this watches one reading rather than a strip`
    )
  }
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = stated(row.scaleSlug)
  if (slug === null || label === null || scaleSlug === null) {
    throw new Error(
      `resolveOneReadout: the one readout of the group \`${groupSlug}\` states no slug, no label or no scale-slug, and a fall names the readout it fell on and the rung it reached`
    )
  }
  return { slug, label, rungs: await rungsOf(scaleSlug) }
}

export async function readReading(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day)
  if (values === null) return null
  return surplusIn(values)
}

export async function readSleepHours(day: string): Promise<number | null> {
  const values = await dayValuesByDate(day)
  if (values === null) return null
  return sleepIn(values)
}
