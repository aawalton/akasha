import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aHandEditToAGeneratedFileIsKeptAsNothingAndSaidToBeKept = {
  id: "01a08a3f-4c21-7b64-9f2e-6d3a5c81e7b0",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-hand-edit-to-a-generated-file-is-kept-as-nothing-and-said-to-be-kept",
  domain: "domain/change",
  claim:
    "A `change-file` naming a generated file keeps no edit and answers as though it kept one. The call exits nought, prints the line that says the edits are kept, and prints no path. `akasha change list` afterwards shows nothing for that path. Nothing tells the caller the edit was refused or why.",
  evidence:
    'Measured 2026-09-10 taking `file-property/worked` away once no page type stated it.\n\nThe removal of `pages/types/properties/worked.file-property.ts` is refused by `import-not-left-hanging`: "`pages/types/page-type.page-type.types.ts` imports `pages/types/properties/worked.file-property.ts`, and `pages/types/properties/worked.file-property.ts` holds no body after". That importer is generated: the landing writes it again from the page type\'s own properties.\n\nThe finding `an-act-is-taken-away-only-after-a-hand-edit-the-landing-discards` records the way through: hand-edit the generated body first so the removal drafts, and let the landing throw that edit away. That way is closed here. Two `change-file` calls over `pages/types/page-type.page-type.types.ts`, each with an `old` block matching the body `akasha change show` prints, both answered "the edits are kept" and named no path. `akasha change list` then held only the two edits over `pages/types/page-type.page-type.ts`, and `akasha change show` printed the types file unchanged.\n\nThe removal landed at 56b61004b7 once the guard was taught to skip an importer a generator owns, so that way through is no longer wanted there. The silent keep is untouched: a `change-file` over a generated file still answers as though it kept an edit.',
} as const satisfies Finding
