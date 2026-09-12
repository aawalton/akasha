import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const starts = {
  id: "01a08e09-01aa-7087-947d-3ba243cffb36",
  type: "record-property",
  slug: "starts",
  propertySlug: "starts",
  definition: "a command a service starts, naming the page it runs rather than spelling a path",
  properties: [
    { pageProperty: "relation-property/run-code", required: true, many: false },
    { pageProperty: "relation-property/run-page", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/run-argument", required: false, many: true, maxCount: null },
    { pageProperty: "boolean-property/lenient", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record has every part of one command.",
    },
    {
      invariantKind: "departure",
      statement: "Every page a command hands over comes before every word that command spells.",
    },
    {
      invariantKind: "departure",
      statement: "A command line is composed from this record rather than written by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A command running a program outside this repository is stated as a run instead.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
