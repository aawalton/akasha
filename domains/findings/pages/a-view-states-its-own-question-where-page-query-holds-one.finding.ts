import type { Finding } from "../finding.page-type.ts"

export const aViewStatesItsOwnQuestionWherePageQueryHoldsOne = {
  id: "01a0657f-0c53-7003-ad50-0bc349c83571",
  pageTypeSlug: "finding",
  slug: "a-view-states-its-own-question-where-page-query-holds-one",
  domainSlug: "workspace-package/pages",
  claim:
    "`page-query` says that a query holds nothing about how its answer is shown, which reads as though a view would name a query and add only the showing. The 59 views migrated do not: each states its own narrows and sorts inline. They were migrated as they stand, because the code that draws them reads those fields off the view.",
  evidence:
    '`page-query.page-type.ts` carries the invariant "A query holds nothing about how its answer is shown" and the properties asks-of-slug, narrows, sort-by, descending, limit and offset. The new `view.page-type.ts` carries draws-slug, narrows, view-sorts, layout, group-by and the page sizes. The overlap is narrows, the sorts and what is asked of.\n\nThe narrow vocabularies match exactly, which is the striking part. `narrow-comparison.text-property.ts` admits is, in, not-in, has, contains, ends-with, empty, at-or-after and before. Read mechanically off all 59 legacy views, the comparisons actually used are at-or-after, before, empty, has, in and is — six of those nine and nothing outside them. So `record-property/narrows` was reused on the view rather than a second narrow shape written.\n\nThe reason the split was not made is that akasha\'s own UI already reads a view inline: `akasha/pages-system/pages-ui-store/query/view-pipeline/view-pipeline.module.code.ts` is "the pipeline answering with the pages a view holds", and `pages-ui/supabase/hooks/hooks.module.code.ts` reads pages of `pageTypeSlug: "view"`. That code migrated before the page type did. Splitting 59 views into 59 queries plus 59 views would have to change it, and page-query belongs to another lane.',
} as const satisfies Finding
