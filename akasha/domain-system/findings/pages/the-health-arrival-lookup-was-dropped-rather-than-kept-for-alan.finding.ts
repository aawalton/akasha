import type { Finding } from "../finding.page-type.ts"

export const theHealthArrivalLookupWasDroppedRatherThanKeptForAlan = {
  id: "01a05e1d-7b83-70d4-ab56-29fb7dd1c21d",
  pageTypeSlug: "finding",
  slug: "the-health-arrival-lookup-was-dropped-rather-than-kept-for-alan",
  domainSlug: "domain/alan-harness",
  claim:
    "A lane held `latest-arrival` in akasha because only Alan knew whether he still wanted it; under his direction to cut the page query dependency it was dropped instead, and git holds it if he wants it back.",
  evidence:
    "Alan directed that the akasha packages stop reaching `@shared/pages-query`, that the old pages and page types stay, and that only `error` be treated differently. `selectLatestArrivalAt` was one of twenty-nine files reaching it. A search over the tree found the name declared once and called nowhere, so cutting its dependency and deleting it are the same act with the same result.\n\nThe finding it was held under said dropping it later costs one commit and putting it back costs finding it in history first. That is the trade taken here: one commit, and `81ca07f77d` is where to look.\n\nHalf of that finding's claim outlives it. The package knows two metrics, `activeEnergy` and `stepCount`, and only `activeEnergy` is read by anything, though the import writes both. Nothing was done about that here.",
} as const satisfies Finding
