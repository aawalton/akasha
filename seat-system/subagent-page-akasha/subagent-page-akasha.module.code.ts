import type { Outcome } from "@akasha/command-system/gated-write"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  pathOf,
  pathsUnder,
  SUBAGENTS_AT,
  slugOf,
  tookUnder,
} from "../subagents/presence/subagent-presence.module.code.ts"

export function akashaSubagentSlug(seatName: string, own: string): string {
  return slugOf(seatName, own)
}

export function akashaSubagentRelPath(slug: string): string {
  return pathOf(slug)
}

export function akashaSubagentsDirIn(root: string): string {
  return `${root}/${SUBAGENTS_AT}`
}

export function akashaSubagentPathsOf(
  seatName: string,
  roots: Roots = resolveRoots()
): readonly string[] {
  const root = rootFor(roots, AKASHA)
  return pathsUnder(root, seatName).map((one) => `${root}/${one}`)
}

export async function removeAkashaSubagentPagesOf(
  seatName: string,
  why: string,
  roots: Roots = resolveRoots()
): Promise<Outcome> {
  const root = rootFor(roots, AKASHA)
  if (pathsUnder(root, seatName).length === 0) return { kind: "unchanged" }
  if (await tookUnder(root, seatName, why)) return { kind: "removed" }
  return { kind: "refused", detail: `the subagent pages under ${seatName} did not go` }
}
