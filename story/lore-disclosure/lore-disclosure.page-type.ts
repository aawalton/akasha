import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const loreDisclosure = {
  id: "01a0d419-8845-7ed9-a90b-d476417c30f4",
  type: "page-type/page-type",
  slug: "lore-disclosure",
  definition: "who a piece of lore is known to",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lore moves from world-builder to wiki and never back.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
