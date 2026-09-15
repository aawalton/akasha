import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const generatorKind = {
  id: "01a04f17-5b78-7c66-9145-7a386e55406e",
  type: "page-type",
  slug: "generator-kind",
  definition: "how a property's value is worked out when its page is created",
  parts: ["boolean-property/after-checks", "generator-kind/uuid-v7"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "boolean-property/after-checks", required: true, many: false }],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "When a generated value is worked out is stated by its kind.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A generator waiting for the checks works out a value no check sees.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
