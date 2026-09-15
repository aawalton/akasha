import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export type List<T> = readonly T[]

export const pageProperty = {
  id: "01a04dff-9d7d-7459-a8c0-e038dc7714c3",
  type: "page-type",
  slug: "page-property",
  definition: "one value a page carries",
  parts: [
    "boolean-property/holds-bytes",
    "boolean-property/nullable",
    "boolean-property/runs-file-length",
    "boolean-property/sorted",
    "module/property-shape",
    "number-property/max-count",
    "number-property/max-length",
    "relation-property/generator",
    "relation-property/unique",
    "relation-property/unique-property",
    "text-property/property-slug",
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
    {
      invariantKind: "absence",
      statement: "No page property names the type a screen draws that property's value as.",
    },
    {
      invariantKind: "absence",
      statement: "No registry keyed by a rendered type picks a property's badge.",
    },
    {
      invariantKind: "departure",
      statement: "The badge and the row any property falls back to are held beside this page type.",
    },
  ],
  typeGenerator: "ts",
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
