import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const franchise = {
  id: "01a06599-ee09-7001-9283-02195311fb0e",
  type: "page-type/page-type",
  slug: "franchise",
  definition: "the shows and films that share a world",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A franchise has a name and the provider the name was read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A franchise the provider gives no id to leaves the id unstated.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
