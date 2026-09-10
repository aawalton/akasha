import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const chessReviewSession = {
  id: "019f1e54-024f-7c0b-9c78-d44a2a2e9f2e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "chess-review-session",
  definition: "one game stepped through move by move with the coach",
  pluralSlug: "chess-review-sessions",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "One game stepped through with the coach is one session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session names the game stepped through rather than the persona who stepped through that game.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session's notes are a file beside the session rather than inside the session page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session is marked at the moment of the stepping through rather than at the day.",
    },
    {
      invariantKind: "gap",
      statement: "A session names the persona who coached that session.",
    },
  ],
  types: "ts",
} as const satisfies PageType
