import type { Finding } from "../finding.page-type.ts"

export const aNumberedFileAddedWithoutItsPageIsClaimedByNobody = {
  id: "01a062bb-0e24-76b0-a8f5-fd7a5bdb0f0c",
  pageTypeSlug: "finding",
  slug: "a-numbered-file-added-without-its-page-is-claimed-by-nobody",
  domainSlug: "workspace-package/pages-system",
  claim:
    "A page's claim on its numbered files is worked out again only for a page the change itself carries. A numbered file added beside a page the change leaves alone is therefore claimed by nobody and refused. A property's files can only grow in a change that rewrites the page as well, and in that same case `page-matches-its-type` judges no row either.",
  evidence:
    "Measured 2026-09-02 against `741975d358`, the commit widening the claim. Four probes through `akasha write --dry-run`.\n\nA `temper-recipe-list` page handed in with `recipes.jsonl` and `recipes.part2.jsonl` passes 36 checks. The same page with `recipes.part3.jsonl` and no `part2` is refused `no page claims this file`, which is the gap in the numbering being held. A row keyed `bogusKey` in the `part2` file is refused for `states `recipes bogusKey`, which `recipes` does not declare`, which is the row judge reading the numbered file. Before that commit the same call was refused for the claim instead, so the row was never reached.\n\nThe fourth probe hands in `alcoholic-drinks.temper-recipe-list.recipes.part2.jsonl` by itself against a page already committed and untouched. It is refused `no page claims this file`.\n\nThe cause is in `settlingOver`. `held` covers every path the change carries, and `pathIn` runs only where `readInto` read a page value out of that path. An entry file is not page shaped, so it files nothing. The page beside it is outside the change, so its claim is not worked out again, and the committed claim is the one from before, naming no `part2`.\n\n`page-matches-its-type` carries the same shape as a gap invariant of its own: `A change carrying an entry file alone is an input to this check.` Both want the page a changed file sits beside pulled into the change the index and the checks are worked out over.",
} as const satisfies Finding
