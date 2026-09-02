import type { Finding } from "../finding.page-type.ts"

export const aDayUrlIsItsIdSuffixSoThirtyReMintsBreakThirtyLinks = {
  id: "01a0601b-d7db-7b46-accc-c038c00378c3",
  pageTypeSlug: "finding",
  slug: "a-day-url-is-its-id-suffix-so-thirty-re-mints-break-thirty-links",
  domainSlug: "domain/akasha-migration",
  claim:
    "A day page's URL is its page type, its slug, and the last eight hex of its id, and the route resolves it by that suffix alone — the slug only breaks a tie. Re-minting the 30 uuid-version-5 days therefore turns every saved link to them into a 404. The 103 kept days survive, because their suffix is unchanged and the slug moving from `2026-03-05` to `day-2026-03-05` is never read. Nothing inside the repository names a day by id, so this is the migration's only reference held by id.",
  evidence:
    "`buildPageHrefParam` at `akasha/pages-system/pages-url/page-href/page-href.module.code.ts:36-39` writes a URL segment as the slug, a hyphen, and `id.slice(-8)`; `parsePageHrefParam` at :45-53 reads the last hyphen-delimited group back as the suffix. `alanwalton/web/app/routes.ts:8` routes `:pageTypeSlug/:pageHrefParam` to a loader calling `getPageByIdSuffix` at `alanwalton/web/app/routes/page-detail-loader.server.ts:62`, and `alanwalton/atlas-web/app/routes/page-detail.tsx:49` does the same. That asks `where: { id: { 'ends-with': suffix } }` filtered by page type at `akasha/pages-system/pages-access/file-read/file-read.module.code.ts:328-331`, and `pickOne` at :363-383 answers the one match without reading the slug, consulting the slug only where two pages share a suffix. The 133 day ids have no duplicate suffix. A miss answers null at :368 and the loader throws a 404 at `page-detail-loader.server.ts:89-91`, so the fault is loud rather than a wrong day. Measured 2026-09-01: 30 of the 133 days carry a uuid version 5, which `tools/daily-tracking-migration/convert.ts:175` re-mints because `akasha/checks/code-checks/pages/id-is-a-uuid-version-7` refuses a version 5 in a `.ts` file and never reads a `.md` one. All 133 days change slug by `tools/daily-tracking-migration/shape.ts:23`. A search of the whole tree for the 133 ids finds them in no file but the 133 markdown days, their 64 session sidecars, and two test fixtures.",
} as const satisfies Finding
