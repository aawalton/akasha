import type { Finding } from "../finding.page-type.ts"

export const threeWatcherLandingsReachThePageStoreServiceRatherThanOne = {
  id: "01a06753-3fdd-7f2a-b4dc-cd47443706ae",
  pageTypeSlug: "finding",
  slug: "three-watcher-landings-reach-the-page-store-service-rather-than-one",
  domainSlug: "domain/temper",
  claim:
    "The count in `an-on-workstation-watcher-lands-completions-through-the-page-store-service` is three writers rather than one. `watcher-net-worth-landing` and `watcher-task-landing` reach pages the way `watcher-completed-day-landing` does, all three through `watcher-page-landing`. So every temper task and every net worth reading the on-workstation watcher lands goes through the pages-system-service too, and repointing one landing leaves two behind.",
  evidence:
    "Measured 2026-09-03 while ablating the last watcher landings out of `temper/scripts/src/watcher`. `akasha/temper/temper-watcher/watcher-page-landing/watcher-page-landing.module.code.ts:1` is the one file in `temper-watcher` importing `@akasha/pages-query`, and nothing else in the package imports it. Three modules import that file: `watcher-net-worth-landing.module.code.ts:6`, `watcher-task-landing.module.code.ts:6` and `watcher-completed-day-landing.module.code.ts`. All three write, calling `writingFor` or `removingFor`, which fall back to `writeFiles` and `removeFiles` from `@akasha/pages-query` at `watcher-page-landing.module.code.ts:47` and `:51`.\n\nThe earlier finding measured inside one lane's thirteen ablated sources, where the completed-day landing was the only writer among them. The net worth and task landings were ablated by another lane, from `net-worth-hour-landing.ts` and `task-page-landing.ts`, and both took the same route before the split: each imported `@akasha/pages-query` directly at its own line 1. The route predates the shared module rather than arriving with it.\n\nA repointing onto `@akasha/pages-access` lands once in `watcher-page-landing` and moves all three, because the fallback is named in that one file rather than in each landing.",
} as const satisfies Finding
