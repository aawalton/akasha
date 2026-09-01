import type { Finding } from "../finding.page-type.ts"

export const resolvingAMediaPageByIdRereadsEveryChapterFile = {
  id: "01a05cf4-03d5-76f2-b8eb-e70319d85a54",
  pageTypeSlug: "finding",
  slug: "resolving-a-media-page-by-id-rereads-every-chapter-file",
  domainSlug: "workspace-package/pages-access",
  claim:
    "Finding a page by its whole id costs seconds, because `askComposed` pushes no filter down and holds nothing between calls: every id lookup reads every file of the page type. The page index already answers the same question from one small file in about a millisecond, and nothing in pages-access reaches it.",
  evidence:
    'Measured on this checkout: `askComposed({"page-type": "story-chapter-royal-road", keys: ["id","slug"], where: {id: {is: ...}}})` took 842 ms, and 831 ms on a second identical call. `askComposed({"page-type": "page-type"})` took 685 ms, then 649 ms.\n\ntools/lib/page-query.ts:194-247 pulls the whole row set for the type at line 197 and filters in JS at 209-214. tools/lib/deriver-hold.ts starts `deriverTtlMs` at 0, and at line 37 returns a fresh `memoRows` on every call, so the memo lives only inside one query. `holdDerivers()` is called from one place, editor-extension/src/extension.ts:37, so the web app never enables it.\n\n`resolveMediaPage` in alanwalton/web/app/lib/media-page.ts therefore costs 944 ms for a Royal Road chapter, 4418 ms for a written one and 1306 ms for an id that is no media page at all, since it tries each of the four media page types in turn.\n\nThe cheaper answer exists: .git/pages/index/identity/id/XX.jsonl holds 55854 distinct ids in 256 sha1-bucketed shards, read by `pagesNamed(word, at)` at page/index/store/store.ts:121-128, and `pageNameOf(key).type` turns the key into the page type slug. Measured at 0 ms and 1 ms. page/required-reading/address-index/address-index.ts:40-48 already composes exactly those two.\n\nWhat stops it is that `page/` is no workspace package, so nothing under akasha/ may reach it, and the index is trusted without being checked against the tree.',
} as const satisfies Finding
