import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const loreDisclosure = {
  id: "01a0d419-8845-7ed9-a90b-d476417c30f4",
  type: "page-type/page-type",
  slug: "lore-disclosure",
  definition: "who a piece of lore is known to",
  extends: ["page-type/page"],
  parts: ["module/lore-withholding", "module/lore-scrubbing", "module/lore-rereading"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The world builder knows every fact, and the game master only the facts naming it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-24T15:47:18.213Z",
  updatedAt: "2026-09-27T14:14:16.000Z",
} as const satisfies PageType
