import type { Finding } from "../finding.page-type.ts"

export const theClassifyItemTestsWereDeletedBeforeThePackageReachedAkasha = {
  id: "01a060ea-f371-7e26-849c-bbd1780b2643",
  pageTypeSlug: "finding",
  slug: "the-classify-item-tests-were-deleted-before-the-package-reached-akasha",
  domainSlug: "domain/temper",
  claim:
    "Eight unit tests over the item classifier were deleted from temper/game-items-core before any of the package moved, so the classifier reached akasha with nothing judging what it answers. The whole of temper-items-core now holds 53 modules and no test at all. The loss is older than the migration and no seat took it, which is why it went unrecorded until the last module landed.",
  evidence:
    "Commit 09f964f5c5 took away broad-filter-type-resilience, companion-gear, edge-cases, full-depth-paths, graceful-degradation, l0-routing, priority-ordering and reclassifications, each a unit test under temper/game-items-core/src/classify-item. The compiled declarations for all eight are still on disk under temper/game-items-core/dist/src/classify-item, which is how the loss is visible at all. Their fixture builder temper/game-items-core/src/classify-item/item.ts, 225 bytes exporting one function named item, outlived them and no file in the checkout imports it; a grep over every tracked .ts outside node_modules and dist answers nothing. It was left behind rather than migrated, and goes with the source package. In its place the landing of classify-item and classify-item-node-ids was proven by answering 15,128 constructed items through both the akasha modules and the source modules and comparing every answer, which found no difference but judges only that the recreation matches what it replaced.",
} as const satisfies Finding
