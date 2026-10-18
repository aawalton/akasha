import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const generatorKind = {
  id: "01a04f17-5b78-7c66-9145-7a386e55406e",
  type: "page-type/page-type",
  slug: "generator-kind",
  definition: "how a property's value is worked out as its page lands",
  parts: [
    "boolean-property/after-checks",
    "boolean-property/every-change",
    "generator-kind/changed-instant",
    "generator-kind/created-instant",
    "generator-kind/progressed-instant",
    "generator-kind/uuid-v7",
    "text-property/watches",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "boolean-property/after-checks", required: true, many: false },
    {
      pageProperty: "boolean-property/every-change",
      required: false,
      many: false,
      default: false,
    },
    { pageProperty: "text-property/watches", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "When a generated value is worked out is stated by its kind.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A generator waiting for the checks works out a value no check sees.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-08-29T19:55:25.944Z",
  updatedAt: "2026-10-18T16:19:16.055Z",
} as const satisfies PageType
