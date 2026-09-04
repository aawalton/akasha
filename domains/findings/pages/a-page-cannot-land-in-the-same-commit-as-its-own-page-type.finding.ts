import type { Finding } from "../finding.page-type.ts"

export const aPageCannotLandInTheSameCommitAsItsOwnPageType = {
  id: "01a05fc7-f922-7efb-abb1-26f1072e3dd3",
  pageTypeSlug: "finding",
  slug: "a-page-cannot-land-in-the-same-commit-as-its-own-page-type",
  domainSlug: "workspace-package/command-system",
  claim:
    "A page whose page type arrives in the same change is refused twice, and neither refusal names the ordering. Its id is never worked out, so it enters no index, and the checks then report it as a file no page is answerable for and as a page stating no id.",
  evidence:
    "`mintingOnto` in `value-minting.module.code.ts` leaves a file alone where `pageNamed(one.path, pageTypes)` is false, and `pageTypes` comes from `pageTypesIn(cast.shadow.reading)`, which reads the page types the index already carries. A page type arriving in the same change is not among them, so every page of that type is left alone, no id is worked out, and `file-has-its-page` and `page-matches-its-type` both refuse. `uuid-v7` states `afterChecks: false`, so the checks give no grace either. Landing the page type in one commit and its pages in the next works, and that is what the temper-effects cluster did for 120 pages across 13 page types. The cost is that the refusal points at `id` rather than at what is actually wrong, so a writer reads it as the rule on ids being false.",
} as const satisfies Finding
