import type { Finding } from "../finding.page-type.ts"

export const mediaPageStandsIsDeadAndBlocksThePageTypeGuard = {
  id: "01a05cf4-03d5-7daa-9e56-e2f2658766b8",
  pageTypeSlug: "finding",
  slug: "media-page-stands-is-dead-and-blocks-the-page-type-guard",
  domainSlug: "workspace-package/web",
  claim:
    "`mediaPageStands` refuses every page it is asked about, so the media token route and both HLS routes are dead. It is also the last caller anywhere that omits `pageTypeSlug` from `getPage`, so it alone stops that argument being made required, which is the only thing that would make this whole class of defect a compiler error rather than a run-time one.",
  evidence:
    'shared/pages-ui/src/media/serve-media.ts:64-67 asks twice. Line 65 passes `pageTypeSlug: medium`, and a medium is "audio" or "image" rather than a page type; there happens to be an `audio` page type, so this returns null for a chapter instead of refusing. Line 67 then falls back to `look({ where, select })` with no page type at all, and `getPage` throws there. So the function never returns false: it throws.\n\nRun against a real chapter id: line 65 returned null, line 67 threw "getPage: pageTypeSlug is required, because a page is read from its own files".\n\nIts callers are alanwalton/web/app/routes/api.media.token.ts:54, api.media.$pageId.$medium.hls.m3u8.ts:74 and api.media.$pageId.$medium.hls.$segment.ts:50. `serveMedia` in the same file is reached from api.media.$pageId.$medium.ts:18 and calls it at line 89.\n\nThe ten other callers that omitted `pageTypeSlug` were fixed at 13b16f31fa and b003d8be72. With this one line changed, `pageTypeSlug` could be made required on `GetPageArgs` in akasha/pages-system/pages-access/get/get.module.code.ts:19 and the root typecheck would still be 0. It was left alone because shared/pages-ui is being rewritten into akasha by another lane, and a content change made in shared now would be dropped rather than carried, since a package moving in is written afresh.\n\nWhat this wants is the same treatment the routes took: ask for the page among the page types whose media config says they render media.',
} as const satisfies Finding
