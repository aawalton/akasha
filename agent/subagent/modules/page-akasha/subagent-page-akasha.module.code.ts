import { pathsUnder } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { tookUnder } from "akasha/agent/subagent/modules/pages-taking/subagent-pages-taking.module.code.ts"
import type { Outcome } from "akasha/change/modules/gated-write/gated-write.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Roots } from "akasha/page/modules/markdown-page-at/markdown-page-at.module.code.ts"

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
  const gone = await tookUnder(root, seatName, why)
  if (!("why" in gone)) return { kind: "removed" }
  return {
    kind: "refused",
    detail: `the subagent pages under ${seatName} did not go — ${gone.why}`,
  }
}
