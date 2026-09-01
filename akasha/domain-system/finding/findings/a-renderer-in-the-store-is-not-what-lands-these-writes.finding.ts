import type { Finding } from "../finding.page-type.ts"

export const aRendererInTheStoreIsNotWhatLandsTheseWrites = {
  id: "01a05b9c-1ad5-7000-81ee-435c5648f495",
  pageTypeSlug: "finding",
  slug: "a-renderer-in-the-store-is-not-what-lands-these-writes",
  domainSlug: "domain/akasha-migration",
  claim:
    "The reading that a renderer in the page store is what lands the writes outside `akasha/` does not follow. The store answers for `akasha/` alone, so a renderer would let it write akasha pages it already writes and would still not reach one markdown page under `pages/`. A renderer for markdown pages already exists, in process, and has all along. What the callers were missing was not a renderer but a way to reach the one they had.",
  evidence:
    '`page-reading.module.code.ts:36` and `page-writing.module.code.ts:33` hold the store to `akasha/` on read and write both, so no renderer changes which files it may touch. The renderer for markdown pages stands at `tools/lib/page-write.ts` with `writePage`, `patchPage`, `patchState` and `removePage`, and rows at `tools/lib/page-rows-write.ts`; `tools/lib/page-query-landing.ts:20-36` routes the eight write acts onto them. Proved by running it: `writePage("color", "pages-query-proof", {title}, writer)` landed `pages/color/pages-query-proof.color.md` as commit e1661ca0c9 and `patchPage` changed its title in 6bcd0c42a5. The worse half was never a refusal at all: the store answers a page type it does not hold with `{"ok":true,"n":0}`, so `askComposed({"page-type":"client-profile"})` read as a true empty and `loadClientBodyweight` (collections/exercises/src/tracking/day-volume.ts:29) threw `no client-profile row states a bodyweight` while `pages/client-profile/alan.client-profile.md` read `bodyweight: 180`. 52 of the 82 files repointed off the store call `askComposed`. The call taken: `@shared/pages-query` presents the same four entry points and routes on `reaches(roots, pageType)` (tools/lib/page-query.ts:253), so a page type standing as files here is answered here and one standing in akasha is handed to the store unchanged. A page type migrates by its files moving, and its callers follow with nothing edited.',
} as const satisfies Finding
