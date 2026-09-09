import type { Finding } from "../finding.page-type.types.ts"

export const aSlugSpelledInCodeOutlivesTheRename = {
  id: "01a08312-3868-7f3e-969b-1fb0632c7dea",
  pageTypeSlug: "finding",
  slug: "a-slug-spelled-in-code-outlives-the-rename",
  domain: "change-mechanical/rename-file-page-type",
  claim:
    "A rename leaves a slug spelled as bare text in code reaching nothing, and no check refuses the landing. The slug is a page type's or a page property's alike, and a restatement matching the address form `relation-property/...` passes over a slug written as a bare constant.",
  evidence:
    "Renaming `wake-day` to `day` in `df2af0cb86` landed 445 files and refused nothing, leaving eleven references to the old slug: six constants holding it as text, among them `AKASHA_DAY_PAGE_TYPE`, and the `asksOfSlug` of five page queries. The index answers nothing for `wake-day` afterwards, so each reaches nothing, and `akasha-day` answers that no page is filed under every day's slug. A guard reads the answer a change gives, and this spelling sits in no page body the change carries. A page property's slug went the same way in `296405a95f`: `alan/track/days/properties/strength-volume.computed-property.code.ts` held `SETS = \"wake-day-slug\"` as a bare constant and handed it to `reach.naming(SETS)`. The address restatement rewrites a slug spelled in the form `relation-property/...`, and a bare constant is not of that form, so the restatement did not match it and the constant was corrected by hand.",
} as const satisfies Finding
