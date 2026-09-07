import type { ChangeMechanicalData } from "../../../data/change-mechanical-data.page-type.ts"

export const removePropertyValue = {
  id: "01a07758-01be-7649-a91a-f8952f0b468e",
  pageTypeSlug: "change-mechanical-data",
  slug: "remove-property-value",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/page-property",
  definition: "one value taken out of one page property in a page's body",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property holding many values keeps its key when the last value goes.",
    },
    {
      invariantKind: "departure",
      statement: "A property holding one value goes with that value.",
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
      statement: "A value the property does not hold is refused rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies ChangeMechanicalData
