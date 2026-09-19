import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loadedExport = {
  id: "01a0b86a-b8c8-7c0c-a118-b4007378118e",
  type: "page-type/text-property",
  slug: "loaded-export",
  propertySlug: "loaded-export",
  definition: "the name a page type's loader reads out of the code beside a page of that type",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type states what its loader reads, rather than a check keeping a list.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name here is fixed by the loader reading it rather than chosen by a writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is an export of the code beside a page of the page type stating it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
