import type { Finding } from "../finding.page-type.ts"

export const theAkashaServiceKnowsSeventyOneOfTheThreeHundredEightyPageTypesPagesAccessServes = {
  id: "01a05e20-9997-7897-8ce3-ef5e910307a6",
  pageTypeSlug: "finding",
  slug: "the-akasha-service-knows-seventy-one-of-the-three-hundred-eighty-page-types-pages-access-serves",
  domainSlug: "domain/akasha-migration",
  claim:
    "The ten pages-access files reaching `@shared/pages-query` cannot be repointed at the akasha pages service, because that service answers for the 71 page types the akasha index holds and pages-access answers for the 380 in the tree.",
  evidence:
    "Asked over HTTP on the workstation, `/ask` for `page-type` returns 71 rows. `find akasha -name '*.page-type.ts'` also returns 71, so the service's roster is exactly what akasha declares. `ls pages/page-type/` returns 380. The service refuses by name anything outside its index: asked for `daily-tracking`, `error`, `health-sample`, `open-question`, `sync-run`, `scale-reading`, `location-trace` or `session-tracking` it answers ``names no page type the index holds`` rather than an empty list, which is the refusal added at `985ba3bcce`.\n\nSo repointing pages-access would not move where it reads from, it would narrow what it can see from 380 page types to 71. `file-read.fileBackedPageTypes()` and `file-write-backing.backings()` both read the whole roster to decide whether a page type's pages are files or rows; against the smaller roster every one of the 309 missing types would be judged wrongly.\n\nAlan directed that the old page types not be migrated. Under that direction this dependency is not one an edit can remove: it goes when the index holds every page type, or when pages-access gives way to the service, and neither is a local change. What an edit can do is gather all ten reaches into one module, so the eventual switch is one file rather than ten.",
} as const satisfies Finding
