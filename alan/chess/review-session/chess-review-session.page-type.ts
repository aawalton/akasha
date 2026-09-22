import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const chessReviewSession = {
  id: "019f1e54-024f-7c0b-9c78-d44a2a2e9f2e",
  type: "page-type/page-type",
  slug: "chess-review-session",
  definition: "a game stepped through move by move with the coach",
  extends: ["page-type/page"],
  parts: [
    "file-property/chess-review-session-notes",
    "instant-property/reviewed-at",
    "relation-property/chess-game",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/chess-game", required: true, many: false },
    { pageProperty: "instant-property/reviewed-at", required: true, many: false },
    { pageProperty: "file-property/chess-review-session-notes", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One game stepped through with the coach is one session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session names the game stepped through rather than the persona who stepped through that game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session's notes are a file beside the session rather than inside the session page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is marked at the moment of the stepping through rather than at the day.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A session names the persona who coached that session.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
