import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyTurnPlayed = {
  id: "01a064bc-8477-7bac-98ec-152da07077ce",
  type: "page-type/page-type",
  slug: "story-turn-played",
  definition: "an exchange of a story nobody wrote",
  pluralSlug: "turns",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  parts: [
    "file-property/rolls",
    "page-type/turn-status",
    "relation-property/turn-status",
    "text-property/turn-action",
    "text-property/turn-beats",
    "text-property/turn-issues",
    "multi-relation-property/turn-lore",
    "multi-relation-property/turn-reviewed-by",
  ],
  properties: [
    { pageProperty: "file-property/prose", required: false, many: false },
    { pageProperty: "file-property/rolls", required: false, many: false, default: "jsonl" },
    {
      pageProperty: "multi-relation-property/characters",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "relation-property/turn-status", required: true, many: false },
    { pageProperty: "text-property/turn-action", required: false, many: false },
    { pageProperty: "text-property/turn-beats", required: false, many: true, maxCount: 100 },
    { pageProperty: "text-property/turn-issues", required: false, many: true, maxCount: 100 },
    {
      pageProperty: "multi-relation-property/turn-lore",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/turn-reviewed-by",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn has the prose one exchange of play made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made from the player's action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's status names whose move the turn waits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moves through world-builder, game-master, reviewers, writer and player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the reviewers find issues in goes back to game-master before writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn has one round of review.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn names the reviewers that have already run on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn has prose only once the writer records it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at player is ready to read.",
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
