import type { Finding } from "../finding.page-type.ts"

export const twoWatcherImportersReachPagesThroughTheServiceMeantForOffWorkstation = {
  id: "01a066b2-4c10-7f21-8d63-5e9a2b74c308",
  pageTypeSlug: "finding",
  slug: "two-watcher-importers-reach-pages-through-the-service-meant-for-off-workstation",
  domainSlug: "domain/temper",
  claim:
    "The watcher runs on the workstation, so it reaches pages data directly, and yet `watcher-import-inventory` and `watcher-import-tasks` both call `askingFor` from `@akasha/pages-system-service/calling`. Their six sibling importers reach `@akasha/pages-access` instead. Both arrived that way from the files they replaced rather than being written that way here.",
  evidence:
    "`temper-watcher.workspace-package.ts` says of itself, as a constraint invariant, that the watcher runs on the workstation the game writes its files on.\n\n`watcher-import-inventory.module.code.ts` lines 1 and 2 import `Asked` and `Query` from `@akasha/pages-system-service/asking` and `askingFor` from `@akasha/pages-system-service/calling`, and line 180 defaults its `ask` seam to it. `watcher-import-tasks.module.code.ts` lines 3 and 4 do the same and default at line 84.\n\nSix siblings take the direct route: `watcher-import-catalog`, `watcher-import-characters`, `watcher-import-companions`, `watcher-import-completion`, `watcher-import-item-rule-verdicts` and `watcher-import-sales` each import `@akasha/pages-access`. `watcher-import-data-mining`, `watcher-import-errors`, `watcher-error-cursor` and `watcher-error-emissions` reach no pages at all.\n\nThe two importers took the route from the files they replaced. `temper/scripts/src/watcher/import-inventory.ts` line 1, ablated at `04c5902e4d`, already imported `askingFor` from the same specifier, so this is inherited rather than introduced.\n\nBoth reach the service through a seam a caller may replace, so the change is a default and a pair of imports rather than a rewrite. What the direct route spells for a read shaped `{ pageTypeSlug, where, limit }` is the part nobody has worked out here.",
} as const satisfies Finding
