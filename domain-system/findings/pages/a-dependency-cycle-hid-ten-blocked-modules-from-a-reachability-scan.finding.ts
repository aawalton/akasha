import type { Finding } from "../finding.page-type.ts"

export const aDependencyCycleHidTenBlockedModulesFromAReachabilityScan = {
  id: "01a0615d-ca71-75ac-a575-733684287581",
  pageTypeSlug: "finding",
  slug: "a-dependency-cycle-hid-ten-blocked-modules-from-a-reachability-scan",
  domainSlug: "domain/temper",
  claim:
    "Working out which modules can land is a reachability question over the import graph, and temper's graph has cycles. A memoised depth-first scan that answers an empty set on the back edge stores that empty answer, so every module in the cycle reads as landable when one of them is blocked. Take the answer to a fixpoint instead.",
  evidence:
    "`temper/game-items-rules-eval` holds a cycle: `condition-eval.ts` calls the ten `conditions/check-*.ts` modules, each of those imports `conditions/check-result.ts`, and `check-result.ts` imports `../condition-eval`. `condition-eval` needs `@temper/game-items-core/eso-trait-reverse-map` and `set-category-mappings.generated`, neither landed, so all twelve are blocked. A depth-first closure guarding recursion with `if f in stack: return set()` and memoising the result answered that ten of them were clean. They were generated, paged and handed to `akasha write`, which refused with ten copies of TS2307 for `../check-result/check-result.module.code.ts` — the one module the same scan had correctly marked blocked and so never generated. Re-running the same graph as a fixpoint (mark a file blocked while any file it imports is blocked, repeat until nothing changes) gave 8 of 23 clean rather than 17, and moved three modules the other way in `game-items-rules-core` and two in `game-items-rules-matcher`.",
} as const satisfies Finding
