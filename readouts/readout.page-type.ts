import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const readout = {
  id: "01a05446-e760-7cb2-848b-4fcfc7ed45d4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "readout",
  definition: "one reading a person is shown",
  pluralSlug: "readouts",
  parts: [
    "boolean-property/readout-enabled",
    "instant-property/last-value-at",
    "number-property/last-value",
    "number-property/place",
    "relation-property/attribute",
    "relation-property/color-from",
    "relation-property/groups",
    "relation-property/read-live-from",
    "relation-property/scale",
    "text-property/color-slug",
    "text-property/drawn-as",
    "text-property/earned-key",
    "text-property/label",
    "text-property/none-left-emoji",
    "text-property/none-left-words",
    "text-property/query-argument",
    "text-property/query-key",
    "text-property/query-slug",
    "text-property/unit",
    "text-property/wire-key",
  ],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "text-property/label", required: true, many: false },
    { pageProperty: "text-property/unit", required: false, many: false },
    { pageProperty: "number-property/place", required: true, many: false },
    {
      pageProperty: "text-property/drawn-as",
      required: false,
      many: false,
      default: "stoplight",
    },
    { pageProperty: "relation-property/scale", required: false, many: false },
    { pageProperty: "text-property/color-slug", required: false, many: false },
    { pageProperty: "relation-property/color-from", required: false, many: false },
    { pageProperty: "text-property/earned-key", required: false, many: false },
    { pageProperty: "relation-property/attribute", required: false, many: false },
    {
      pageProperty: "relation-property/groups",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/none-left-words", required: false, many: false },
    { pageProperty: "text-property/none-left-emoji", required: false, many: false },
    { pageProperty: "text-property/wire-key", required: true, many: false },
    { pageProperty: "text-property/query-slug", required: false, many: false },
    { pageProperty: "text-property/query-key", required: false, many: false },
    { pageProperty: "text-property/query-argument", required: false, many: false },
    { pageProperty: "relation-property/read-live-from", required: false, many: false },
    {
      pageProperty: "boolean-property/readout-enabled",
      required: false,
      many: false,
      default: "true",
    },
    {
      pageProperty: "number-property/last-value",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/last-value-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A readout takes its own reading on the page with the code that takes the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names its scale rather than carrying a scale.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names the fact that earns a color rather than naming the color.",
    },
    {
      invariantKind: "departure",
      statement: "Which color is earned belongs to the scale rather than to the readout.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has its label and unit.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has nothing about how the label and unit are drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has one place whatever groups draw the readout.",
    },
    {
      invariantKind: "departure",
      statement:
        "The place a readout has is where that readout sits rather than how wide its figure is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A readout names the query answering that readout rather than holding the question.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names which of its query's numbers the readout takes.",
    },
    {
      invariantKind: "departure",
      statement: "A readout states whether anything draws the readout.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a readout last took is carried outside the commit.",
    },
    {
      invariantKind: "gap",
      statement: "Everything a readout shows is stated on the readout.",
    },
    {
      invariantKind: "gap",
      statement: "Where and how big is the display's.",
    },
  ],
  types: "ts",
} as const satisfies PageType
