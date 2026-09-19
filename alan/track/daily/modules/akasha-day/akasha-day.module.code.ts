import type { Landed } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"

import { AKASHA_DAY_PAGE_TYPE } from "akasha/alan/track/daily/modules/track-shape/track-shape.module.code.ts"
import { landTracking } from "akasha/alan/track/modules/landing/track-landing.module.code.ts"
import {
  ALREADY_HELD,
  PUT_BACK,
} from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"
import {
  composedFor,
  type Put,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

export type Values = Readonly<Record<string, unknown>>

const AKASHA_REPO = "akasha"

export function rootOf(): string {
  const root = resolveRoots()[AKASHA_REPO]
  if (root === undefined)
    throw new Error("no akasha checkout is resolved, so no day can be written")
  return root
}

export function camelised(values: Values): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(values)) {
    if (held === null || held === undefined) continue
    out[camelizeKey(key)] = held
  }
  return out
}

export interface Standing {
  readonly path: string
  readonly value: Readonly<Record<string, unknown>>
}

export function dayStanding(root: string, slug: string): Standing | null {
  const listed = listedAt(root, AKASHA_DAY_PAGE_TYPE, slug)
  const path = listed.length === 1 ? listed[0]?.path : undefined
  if (path === undefined) return null
  return { path, value: valueAt(path, root) ?? {} }
}

export async function written(puts: readonly Put[], message: string): Promise<Landed> {
  if (puts.length === 0) return { ok: false, why: "nothing was composed to write" }
  const said = await landTracking({
    root: rootOf(),
    changes: puts.map((one) => ({ path: one.path, body: one.content })),
    message,
  })
  if ("refused" in said) return { ok: false, why: `the tracking landing refused: ${said.refused}` }
  return { ok: true, at: puts[0]?.path ?? "" }
}

export const TRIES = 4

const PAUSE_MS = 400

export function movedUnder(landed: Landed): boolean {
  return !landed.ok && landed.why.includes(PUT_BACK)
}

export function alreadyHeld(landed: Landed): boolean {
  return !landed.ok && landed.why.includes(ALREADY_HELD)
}

export async function landingRetried(
  land: () => Promise<Landed>,
  pause: (ms: number) => Promise<void> = (ms) => Bun.sleep(ms)
): Promise<Landed> {
  let last = await land()
  for (let left = TRIES - 1; left > 0 && movedUnder(last); left -= 1) {
    await pause(PAUSE_MS)
    last = await land()
  }
  return last
}

async function landDayPageOnce(
  act: "write" | "patch",
  slug: string,
  values: Values,
  writer: string
): Promise<Landed> {
  const root = rootOf()
  const standing = act === "patch" ? dayStanding(root, slug) : null
  const whole = {
    ...(standing?.value ?? {}),
    ...camelised(values),
    type: AKASHA_DAY_PAGE_TYPE,
    slug,
  }
  const composed = composedFor(root, { pageTypeSlug: AKASHA_DAY_PAGE_TYPE, slug, values: whole })
  if ("refused" in composed) return { ok: false, why: composed.refused }
  if (composed.kept !== null) {
    const why =
      `\`${AKASHA_DAY_PAGE_TYPE}\` declares a property kept outside the commit and this writes ` +
      `none; ${composed.kept.path} would carry ` +
      Object.keys(composed.kept.values).join(", ")
    return { ok: false, why }
  }
  const landed = await written([composed.put], `${writer}: the day ${slug}`)
  if (alreadyHeld(landed)) return { ok: true, at: composed.put.path }
  return landed
}

export function landAkashaDayPage(
  act: "write" | "patch",
  slug: string,
  values: Values,
  writer: string
): Promise<Landed> {
  return landingRetried(() => landDayPageOnce(act, slug, values, writer))
}
