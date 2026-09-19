import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyTurnPlayed = {
  id: "01a064bc-8477-7bac-98ec-152da07077ce",
  type: "page-type/page-type",
  slug: "story-turn-played",
  definition: "one exchange of a story nobody wrote",
  pluralSlug: "turns",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [{ pageProperty: "file-property/prose", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn has the prose one exchange of play made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is part of the one story the turn was played in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's slug opens with the story the turn is part of.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A turn's text is kept here alone rather than also in a game's rows.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
