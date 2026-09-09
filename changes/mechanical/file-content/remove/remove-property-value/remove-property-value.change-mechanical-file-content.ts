import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removePropertyValue = {
  id: "01a07758-01be-7649-a91a-f8952f0b468e",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "remove-property-value",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value taken out of one page property in a page's body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property with many values keeps its key when the last value goes.",
    },
    {
      invariantKind: "departure",
      statement: "A property with one value goes with that value.",
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
      statement: "A value the property does not have is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The passage answered is the lines the value is taken out of rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
