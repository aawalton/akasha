import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removePageProperty = {
  id: "01a081b6-70d4-7587-bf68-8de27965382c",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "remove-page-property",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/file-content-page-property-key",
  definition: "one key taken out of a page's body with every value that key holds",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key goes with every value that key holds, however many those are.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states no value under is refused rather than taken away.",
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
      statement: "The key alone is read here, and the values that key holds are not read.",
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
  ],
} as const satisfies ChangeMechanicalFileContent
