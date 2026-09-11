import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const manyDeclaration = {
  id: "01a090a6-984a-7b9d-99e6-299e1fff2958",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "many-declaration",
  propertySlug: "many-declaration",
  definition: "a page type's declaration of a property carried more than once",
  properties: [
    { pageProperty: "relation-property/page-property", required: true, many: false },
    { pageProperty: "boolean-property/required", required: true, many: false },
    { pageProperty: "true-property/many-valued", required: true, many: false },
    { pageProperty: "number-property/max-count", required: true, many: false },
    { pageProperty: "number-property/max-length", required: false, many: false },
    { pageProperty: "boolean-property/uncommitted", required: false, many: false },
    { pageProperty: "boolean-property/secret", required: false, many: false },
    { pageProperty: "relation-property/unique", required: false, many: false },
    { pageProperty: "relation-property/unique-property", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a declaration with many values states a count.",
    },
    {
      invariantKind: "departure",
      statement: "A count left unbounded is stated as nothing rather than left out.",
    },
    {
      invariantKind: "absence",
      statement: "A declaration with many values states no default.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration saying many keeps every value in the page file.",
    },
    {
      invariantKind: "departure",
      statement: "The true this states is what tells a declaration from its one-valued sibling.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
