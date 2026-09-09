import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removePageProperty = {
  id: "01a081b6-70d4-7587-bf68-8de27965382c",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "remove-page-property",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-key",
  definition: "one key taken out of a page's body with every value that key has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key goes with every value that key has, however many those are.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states no value under is answered as no edit rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no such key is already what taking that key away leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A key mistyped is caught by the caller reading the page type rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is required is read from the type the page's body satisfies.",
    },
    {
      invariantKind: "departure",
      statement: "A required property is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Taking a required property away is a retype.",
    },
    {
      invariantKind: "departure",
      statement: "A property that could not be read as required or not is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused rather than losing a key.",
    },
    {
      invariantKind: "departure",
      statement: "The key alone is read here, and the values that key has are not read.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The passage answered is the lines the key is taken out of rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "The only text written here is the empty string, so no relation value arrives.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page is taken away here, so a guard reading what an answer takes away reads nothing.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
