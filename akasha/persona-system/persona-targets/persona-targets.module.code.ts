import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { CommsRule } from "@akasha/seat-system/seat-wake-rules"
import { personasStanding } from "../persona-reading/persona-reading.module.code.ts"

export interface PersonaTarget {
  readonly id: string
  readonly slug: string
  readonly wakeSources: readonly CommsRule[]
}

const NONE: readonly CommsRule[] = []

export async function listPersonaTargets(): Promise<readonly PersonaTarget[]> {
  const root = rootFor(resolveRoots(), AKASHA)
  return personasStanding(root).map((one) => ({
    id: one.id,
    slug: one.slug,
    wakeSources: NONE,
  }))
}

export async function listPersonaWakeSources(): Promise<ReadonlyMap<string, readonly CommsRule[]>> {
  const entries = (await listPersonaTargets())
    .filter((one) => one.wakeSources.length > 0)
    .map((one): readonly [string, readonly CommsRule[]] => [one.slug, one.wakeSources])
  return new Map(entries)
}

export async function listPersonaSlugs(): Promise<readonly string[]> {
  return (await listPersonaTargets()).map((one) => one.slug)
}
