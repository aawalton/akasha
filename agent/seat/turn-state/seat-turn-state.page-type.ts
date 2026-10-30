import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seatTurnState = {
  id: "01a06924-e882-736f-8cac-465ef2b5d799",
  type: "page-type/page-type",
  slug: "seat-turn-state",
  definition: "what the agent of a seat is doing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "turn state" },
    { partOfSpeech: "part-of-speech/noun", spelling: "turn states" },
  ],
  extends: ["page-type/domain"],
  parts: [
    "computed-property-module/seat-working",
    "relation-property/turn-state-color",
    "seat-turn-state/idle",
    "seat-turn-state/stopped",
    "seat-turn-state/working",
  ],
  properties: [{ pageProperty: "relation-property/turn-state-color", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is in one turn state at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state's slug is the name the seat system reads that state by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every turn state names a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state that is stopped names a color too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color here is a name a palette resolves rather than a shade.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which agent is in which state.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T21:20:21.634Z",
  updatedAt: "2026-10-30T15:36:43.405Z",
} as const satisfies PageType
