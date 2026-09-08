import type { Finding } from "../finding.page-type.ts"

export const aPageTypeSlugSpelledInCodeOutlivesTheRename = {
  id: "01a08312-3868-7f3e-969b-1fb0632c7dea",
  pageTypeSlug: "finding",
  slug: "a-page-type-slug-spelled-in-code-outlives-the-rename",
  domainSlug: "change-mechanical/rename-file-page-type",
  claim:
    "A page type's rename leaves a slug spelled as text in code reaching nothing, and no check refuses the landing.",
  evidence:
    "Renaming `wake-day` to `day` in `df2af0cb86` landed 445 files and refused nothing, leaving eleven references to the old slug: six constants holding it as text, among them `AKASHA_DAY_PAGE_TYPE`, and the `asksOfSlug` of five page queries. The index answers nothing for `wake-day` afterwards, so each reaches nothing, and `akasha-day` answers that no page is filed under every day's slug. A guard reads the answer a change gives, and this spelling sits in no page body the change carries.",
} as const satisfies Finding
