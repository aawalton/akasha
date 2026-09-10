import type { PageType } from "@akasha/pages/page-type"

export const storyTurnPlayed = {
  id: "01a064bc-8477-7bac-98ec-152da07077ce",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-turn-played",
  definition: "one exchange of a story nobody wrote",
  pluralSlug: "story-turns-played",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [{ pageProperty: "file-property/prose", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn has the prose one exchange of play made.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is part of the one story the turn was played in.",
    },
    {
      invariantKind: "departure",
      statement: "A turn's slug opens with the story the turn is part of.",
    },
    {
      invariantKind: "gap",
      statement: "A turn's text is kept here alone rather than also in a game's rows.",
    },
  ],
  types: "ts",
} as const satisfies PageType
