import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export type List<T> = readonly T[]

export const pageProperty = {
  id: "01a04dff-9d7d-7459-a8c0-e038dc7714c3",
  type: "page-type",
  slug: "page-property",
  definition: "one value a page carries",
  pluralSlug: "page-properties",
  parts: [
    "boolean-property/holds-bytes",
    "boolean-property/nullable",
    "boolean-property/runs-file-length",
    "boolean-property/sorted",
    "number-property/max-count",
    "number-property/max-length",
    "relation-property/generator",
    "relation-property/unique",
    "relation-property/unique-property",
    "text-property/property-slug",
    "text-property/rendered-as",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "text-property/property-slug", required: true, many: false },
    { pageProperty: "relation-property/generator", required: false, many: false },
    { pageProperty: "relation-property/unique", required: false, many: false },
    { pageProperty: "relation-property/unique-property", required: false, many: false },
    { pageProperty: "file-property/types", required: false, many: false },
    { pageProperty: "boolean-property/nullable", required: false, many: false },
    { pageProperty: "boolean-property/sorted", required: false, many: false },
    { pageProperty: "text-property/rendered-as", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property's shape is the page type that property is rather than a value the property states.",
    },
    {
      invariantKind: "departure",
      statement: "A page property does not extend.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page type does.",
    },
    {
      invariantKind: "departure",
      statement:
        "How many values a page has is stated in the declaration rather than on the property.",
    },
    {
      invariantKind: "departure",
      statement: "A property is reached by its slug and read by its key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page property's type is written beside that property rather than written by hand.",
    },
    {
      invariantKind: "departure",
      statement: "That type says what the property's own kind says and nothing a page states.",
    },
    {
      invariantKind: "departure",
      statement: "The two answer to different reaches.",
    },
  ],
  typeGenerator: "ts",
  types: "ts",
} as const satisfies PageType
