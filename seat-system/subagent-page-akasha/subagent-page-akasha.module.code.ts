import type { Outcome } from "akasha/changes/modules/gated-write/gated-write.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import type { Roots } from "akasha/pages/markdown-page-at/markdown-page-at.module.code.ts"
import {
  pathsUnder,
  subagentsAt,
} from "akasha/seat-system/subagents/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  sweeping,
  tookUnder,
} from "akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"

export function akashaSubagentsDirIn(root: string): string {
  return `${root}/${subagentsAt(root)}`
}

export function akashaSubagentPathsOf(
  seatName: string,
  roots: Roots = resolveRoots()
): readonly string[] {
  const root = rootFor(roots, AKASHA)
  return pathsUnder(root, seatName).map((one) => `${root}/${one}`)
}

export function sweepingAkashaSubagentPagesOf(
  seatName: string,
  seatId: string,
  why: string,
  roots: Roots = resolveRoots()
): undefined {
  sweeping(rootFor(roots, AKASHA), seatName, seatId, why)
}

export async function removeAkashaSubagentPagesOf(
  seatName: string,
  why: string,
  roots: Roots = resolveRoots()
): Promise<Outcome> {
  const root = rootFor(roots, AKASHA)
  if (pathsUnder(root, seatName).length === 0) return { kind: "unchanged" }
  const gone = await tookUnder(root, seatName, why)
  if (!("why" in gone)) return { kind: "removed" }
  return {
    kind: "refused",
    detail: `the subagent pages under ${seatName} did not go — ${gone.why}`,
  }
}
