import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyTurnPlayed = {
  id: "01a064bc-8477-7bac-98ec-152da07077ce",
  type: "page-type/page-type",
  slug: "story-turn-played",
  definition: "an exchange of a story nobody wrote",
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
      decisionKind: "decision-kind/departure",
      statement: "A turn's text is kept here alone rather than also in a game's rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A system window sits in a turn's prose where it happens, as a block of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window block opens on three colons and the window's kind, and shuts on three colons alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line between is one field of the window: its name, rung, level or note.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level-up states its level, a skill its name and rung, and an affinity its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is drawn as its window card, and no line of its block shows as prose.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
