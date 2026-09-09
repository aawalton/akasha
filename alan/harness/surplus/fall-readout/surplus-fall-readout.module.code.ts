import type { Query } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import { stilled } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { stated } from "akasha/readouts/none-left/readout-none-left.module.code.ts"
import { sleepIn } from "akasha/readouts/pages/upkeep-sleep/upkeep-sleep.readout.code.ts"
import { surplusIn } from "akasha/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts"
import { climbs, rungsIn } from "akasha/readouts/tier/readout-tier.module.code.ts"
import { dayValuesByDate } from "../../../track/daily/day-reading/day-reading.module.code.ts"
import { onTheWorkstation } from "../../alanwalton-ios-notification/push-device-tokens/push-device-tokens.module.code.ts"
import { isTierColor, type Rung } from "../fall-tier/surplus-fall-tier.module.code.ts"

export const SLEEP_HOURS_KEY = "sleep-hours"

export interface Readout {
  readonly slug: string
  readonly label: string
  readonly rungs: readonly Rung[]
}

const READOUT_PAGE_TYPE_SLUG = "readout"

const READOUT_SCALE_PAGE_TYPE_SLUG = "readout-scale"

type Values = Readonly<Record<string, unknown>>

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

export async function resolveOneReadout(groupSlug: string): Promise<Readout> {
  const rows = await rowsOf(
    {
      pageTypeSlug: READOUT_PAGE_TYPE_SLUG,
      where: { groups: { has: groupSlug } },
    },
    `resolveOneReadout: the readouts of the group \`${groupSlug}\` went unread, so what is being watched is unknown`
  )
  const drawn = rows.filter((one) => !stilled(one))
  const [row, ...rest] = drawn
  if (row === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: the group \`${groupSlug}\` holds ${drawn.length} readouts, and this watches one reading rather than a strip`
    )
  }
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = stated(row.scale)
  if (slug === undefined || label === undefined || scaleSlug === undefined) {
    throw new Error(
      `resolveOneReadout: the one readout of the group \`${groupSlug}\` states no slug, no label or no scale, and a fall names the readout it fell on and the rung it reached`
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
