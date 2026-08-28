---
id: cc8c89aa-5108-4403-a98a-2894856a9ddd
page-type-slug: finding
title: "Seven readers cut a name into a stem, and they do not agree"
slug: seven-name-stem-readers-disagree
domain-slug: domain/pages-system
---

# Claim

Cutting a file's name into a stem is done in seven places, five of them private functions all spelled `stemOf`. Three cut the basename at the first period and disagree with each other on a name that opens with one. One already delegates to `pageNameOf` and then falls back to stripping `.md` when that refuses, which is the fallback a caller asking for the slug of a non-page should not get.

# Evidence

`page/name/name.ts` holds the shared pair, `pageNameOf` and — since the split — `pageStemOf` and `fileStemOf`. Beside them stand five private ones, none reachable from the others.

`pages-system/store/row-pages.ts:49` and `tools/lib/page-query-naming.ts:19` both take the basename and cut at the first period, testing `dot < 0`. `fileStemOf` tests `dot <= 0`. On `.gitignore` the first two answer the empty string and `fileStemOf` answers `.gitignore`. `page-query-naming` also strips a `repo:` prefix first, which the others do not.

`page/page-file.ts:6` answers `pageNameOf(name)?.stem ?? name.slice(0, -MARKDOWN.length)`. Its first branch is the page stem and its second is a guess made for a file that is not a page, returned indistinguishably from the first. It is consumed by `pageFileIn`, whose callers include `tools/lib/oauth-page-push.ts:46` and `tools/commands/code-editor/color.ts:117`, both of which then compose a path carrying no page type when it answers null.

`page/rows-file.ts:25` keeps the directory and strips a suffix it computes, and `checks-system/check/folder-matches-a-shape/folder-matches-a-shape.check.code.attachment.ts:29` strips one fixed suffix or nothing. Neither is a basename cut at all, so the shared name is doing three different jobs across the seven.

I did not measure which inputs reach the divergent branches; no name opening with a period stands in the corpus today.
