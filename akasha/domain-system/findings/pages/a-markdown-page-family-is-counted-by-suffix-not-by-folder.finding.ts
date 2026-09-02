import type { Finding } from "../finding.page-type.ts"

export const aMarkdownPageFamilyIsCountedBySuffixNotByFolder = {
  id: "01a06103-44b6-7045-b002-ac8da81a68c2",
  pageTypeSlug: "finding",
  slug: "a-markdown-page-family-is-counted-by-suffix-not-by-folder",
  domainSlug: "domain/akasha-migration",
  claim:
    "The `files:` glob on a markdown page type is a suffix scan from the checkout root rather than a folder, so `akasha:**/*.page-query.md` reaches every such file anywhere in the tree. Counting a page family by reading `pages/<slug>/` undercounts it. Of 106 saved queries, 89 are in that folder, 15 more under `readouts/query/` and 2 beside readouts. An agent comparing against the smaller set nearly concluded that all 13 readouts named a query that was gone.",
  evidence:
    "The undercount was caught before it was acted on, by widening the search rather than by doubting the conclusion. Against the full 106, every one of the 13 `query-slug` values in `readouts/readout/*.md` resolves, and `readouts/readout-resolver.ts:123` was never at risk.\n\nThe same investigation corrected a second rule that had already been acted on. A saved query for the page type `persona-points-source` was deleted on the reasoning that the saved-query road is dead for every slug alike, because `readouts/ask-here.ts:17` throws unconditionally. That reasoning is false. There are three roads: that one, `tools/commands/page/query.ts:56,63` resolving off disk, and `tools/lib/page-query-answer.ts:31-40` doing the same over HTTP. Two of the three are live.\n\nThe deletion was harmless anyway, for a different reason. `tools/lib/page-derive.ts:374-375` answers null rather than raising where a page type is neither filed nor held, and that page type had moved into akasha with its 24 pages. So the HTTP road answered 503 before the deletion and 404 after, and the command answered the same sentence either way. No working answer was lost.\n\nSo the test is not which road asks. The test is whether the subject page type has left markdown. That is the rule to reuse, and the one that was nearly generalised wrongly.\n\nThe 503-to-404 step is read off three lines rather than observed, because the `ops` command is turned off in this environment.",
} as const satisfies Finding
