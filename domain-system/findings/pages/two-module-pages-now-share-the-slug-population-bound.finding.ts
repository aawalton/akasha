import type { Finding } from "../finding.page-type.ts"

export const twoModulePagesNowShareTheSlugPopulationBound = {
  id: "01a06860-bf1f-7463-99bb-b14f04a1e3fa",
  pageTypeSlug: "finding",
  slug: "two-module-pages-now-share-the-slug-population-bound",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two module pages are slugged `population-bound`, and they are one concept written twice at different fidelity. The temper one renders a count against a declared count. The one filed from the repo root also carries the tree the members were read under, the members that could not be examined, and the shortfall against a least count. A caller reaching for the slug gets whichever package it sits in.",
  evidence:
    'Measured 2026-09-03. `akasha/temper/temper-build-deploy-checks/population-bound/population-bound.module.ts` is id 01a06287-7841-72c9-bcad-ce7b9ecfcd04, definition "the note saying how much of a population a run examined", and eleven temper check modules call its `renderPopulationBound`. `akasha/checks/cluster-checks/modules/population-bound/population-bound.module.ts` is id 01a06829-124f-786a-9dbd-9ce891c54621 and exports `renderBound` and `renderShortfall`. Both emit the same `[EMPTY POPULATION - 0 unit: this run examined nothing, so it certifies nothing]` line, so they are the same note.\n\nThe second was filed rather than dropped because it carries three reports the temper one does not, and ablating it would have destroyed those. Within the hour `tools/lib/check-workflow/population-bound.ts` was removed and every reader repointed onto the filed copy, so this slug is now the only home for those three reports.\n\nA slug shared by two module pages is not new: `answer-pages`, `answer-page-types`, `answer-page-write`, `format-relative-time`, `nav-icon-svg`, `push-registration-sync` and `retry-transient-ddl` each stood on two or more module pages before this work, so seven such pairs already stand.',
} as const satisfies Finding
