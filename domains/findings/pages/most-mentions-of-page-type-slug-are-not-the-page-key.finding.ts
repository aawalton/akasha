import type { Finding } from "../finding.page-type.types.ts"

export const mostMentionsOfPageTypeSlugAreNotThePageKey = {
  id: "01a08830-e34b-723b-8e6a-25f0afc6de8d",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "most-mentions-of-page-type-slug-are-not-the-page-key",
  domain: "workspace-package/page",
  claim:
    "`pageTypeSlug` spells four different things, and only one of them is the key a page states. Whoever takes the last step of the two-key window will grep the name and get thousands of hits, most of which must not change. The three that are not the page key are an index record field, a query key on the wire into the pages service, and a value worked out from a file's name rather than read from a body. Telling them apart is the difference between a day and a week, and nothing in the tree says which is which.",
  evidence:
    'The page key is the one written into a page body and read as `textAt(value, "type") ?? textAt(value, "pageTypeSlug")`, at `pages/indexes/identity/index-identity.index.code.ts:66`, `path/index-path.index.code.ts:49`, `relation/index-relation.index.code.ts:28`, `value/index-value.index.code.ts:41` and `reaching/reaching.module.code.ts:185`. The index record field is a different thing wearing the same name: the `Carried`, `Held`, `InPageType` and `Renaming` shapes all carry a `pageTypeSlug`, and `pages/service/page-asking/page-asking.module.code.ts:124` builds an output row as `type: one.pageTypeSlug` off it. The wire key is an argument to a query rather than anything a page states, as in `ask({ pageTypeSlug, where })` at `pages/access/file-write/file-write.module.code.ts:79`, across `pages/access/*`, and in every route named `api.pages.$pageTypeSlug.ts` under `alan/web`, `temper/temper-web` and `smilingjenny`. The fourth is worked out from a path by `@akasha/pages/page-file-name`, which is how all of `folder-matches-a-shape` and its folder shapes come by it. Around 326 files name it outside page values, and 148 test files hold a `pageTypeSlug: "` fixture in a scratch world; those fixtures are correct today and all go red at once when the window closes, rather than batch by batch.',
} as const satisfies Finding
