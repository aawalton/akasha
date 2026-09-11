import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const singleDeclaration = {
  id: "01a090a6-673e-7677-a8c7-31c03a192934",
  type: "record-property",
  slug: "single-declaration",
  propertySlug: "single-declaration",
  definition: "a page type's declaration of a property carried once",
  properties: [
    { pageProperty: "relation-property/page-property", required: true, many: false },
    { pageProperty: "boolean-property/required", required: true, many: false },
    { pageProperty: "false-property/one-valued", required: true, many: false },
    { pageProperty: "text-property/default-value", required: false, many: false },
    { pageProperty: "text-property/fixed-value", required: false, many: false },
    { pageProperty: "number-property/max-length", required: false, many: false },
    { pageProperty: "boolean-property/uncommitted", required: false, many: false },
    { pageProperty: "boolean-property/secret", required: false, many: false },
    { pageProperty: "relation-property/unique", required: false, many: false },
    { pageProperty: "relation-property/unique-property", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a declaration with one value states a default.",
    },
    {
      invariantKind: "absence",
      statement: "A declaration with one value states no count.",
    },
    {
      invariantKind: "departure",
      statement: "The false this states is what tells a declaration from its many-valued sibling.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
