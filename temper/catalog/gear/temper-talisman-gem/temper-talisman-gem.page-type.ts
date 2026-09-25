import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTalismanGem = {
  id: "01a0d986-17f8-7c83-850b-f9d408fc31db",
  type: "page-type/page-type",
  slug: "temper-talisman-gem",
  definition: "a gem socketed into a mythic talisman to upgrade it",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/socketed-into", "text-property/gem-source"],
  properties: [
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "relation-property/socketed-into", required: true, many: false },
    { pageProperty: "text-property/gem-source", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How a player gets a gem is kept on the gem's page, as the game client gives no addon that.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
