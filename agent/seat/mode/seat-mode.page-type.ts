import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seatMode = {
  id: "01a0d4cf-8d02-7b34-bb6d-91cc631b1b37",
  type: "page-type/page-type",
  slug: "seat-mode",
  definition: "a way an agent in a seat is run",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The mode a seat runs in and the mode it started in are both seat modes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat mode's slug is the word the seat commands take for that mode.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
