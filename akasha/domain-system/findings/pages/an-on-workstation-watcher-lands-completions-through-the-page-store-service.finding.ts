import type { Finding } from "../finding.page-type.ts"

export const anOnWorkstationWatcherLandsCompletionsThroughThePageStoreService = {
  id: "01a0674b-cf9b-7306-989f-3da3b98cb733",
  pageTypeSlug: "finding",
  slug: "an-on-workstation-watcher-lands-completions-through-the-page-store-service",
  domainSlug: "domain/temper",
  claim:
    "The temper watcher runs on the workstation, and its completed-day landing reaches pages through `@akasha/pages-query`, a client of the pages-system-service. The design rule is that on-workstation code reaches pages data directly and never calls that service. The nine export writers beside it in the same workspace-package use `@akasha/pages-access`, which is direct, so the two halves of one package disagree about how pages are reached.",
  evidence:
    "Measured 2026-09-03 while ablating the watcher export sources. `akasha/temper/temper-watcher/temper-watcher.workspace-package.ts:94` carries the constraint `The watcher runs on the workstation the game writes its files on`, and `akasha/temper/temper-watcher/workstation-services/temper-watcher.workstation-service.ts` is a workstation-service page, so the watcher is on-workstation twice over.\n\n`akasha/temper/temper-watcher/watcher-page-landing/watcher-page-landing.module.code.ts:1` imports `readFiles, removeFiles, writeFiles` from `@akasha/pages-query`. That package resolves to `store-writing`, and its fetcher at `akasha/pages-system/pages-query/store-reaching/store-reaching.module.code.ts:9` names the origin `http://page-store.page-store.svc.cluster.local:8787`. The same origin appears at `akasha/pages-system/service/page-calling/page-calling.module.code.ts:16`, and `akasha/pages-system/service/workstation-services/pages-system-service.workstation-service.ts` binds port 8787. So `pages-query` reaches the pages-system-service rather than the checkout.\n\n`watcher-completed-day-landing` writes through that path, and of the 13 watcher sources ablated alongside it, it is the only writer that does. The other nine touching pages use `@akasha/pages-access/get`, `/iterate` and `/patch`; grepping those three folders for `pages-system-service`, `store-reaching` and `pages-query` returns nothing, so that arm is direct and on the correct side of the rule.",
} as const satisfies Finding
