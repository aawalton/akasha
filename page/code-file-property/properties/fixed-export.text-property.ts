import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const fixedExport = {
  id: "01a0b8b8-c95b-78fc-acaf-f63af9984f5e",
  type: "page-type/text-property",
  slug: "fixed-export",
  propertySlug: "fixed-export",
  definition: "the name a reader fixes on every file this property names",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property states what reads its file, rather than a check keeping a list.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name here is fixed by what reads the file rather than chosen by a writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is fixed on every file this property names rather than on one.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
