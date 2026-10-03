import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyPlayed = {
  id: "01a06424-329c-7c08-a753-0e0520e2d22c",
  type: "page-type/page-type",
  slug: "story-played",
  definition: "a story nobody wrote",
  icon: "gamepad-2",
  pluralSlug: "stories",
  extends: ["page-type/story"],
  runsTabooCheck: false,
  detailConfig: {
    frame: {
      autoScroll: {
        loadScroll: "end",
      },
    },
  },
  parts: [
    "file-property/prose",
    "module/action-bar",
    "module/action-bar-sending",
    "module/action-bar-state",
    "module/beat-overlay",
    "module/cover-rerolling",
    "module/played-asking",
    "module/played-beside",
    "module/played-layout",
    "module/player-beside",
    "module/played-channel",
    "module/played-panels",
    "module/played-pools",
    "module/played-purses",
    "module/played-rows",
    "module/played-sheet-rows",
    "module/portrait-redrawing",
    "module/played-shell",
    "module/played-state-beside",
    "module/prose-beside",
    "module/purse-ledger",
    "page-type/story-chapter-played",
    "page-type/story-turn-played",
    "relation-property/world",
    "instant-property/story-opens-at",
    "relation-property/cover-reroll",
    "text-property/cover-reroll-refused",
    "service-workstation/cover-rerolling",
    "module/turn-undo-answering",
    "module/turn-undo-control",
    "service-workstation/turn-undo-answering",
    "text-property/action-draft",
    "relation-property/turn-undo",
    "text-property/turn-undo-refused",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played was made in play rather than written before the play.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played heads its page with its title, over the run play left it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story played's play screen is loaded from the panels it names rather than built with the app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a story played holds of its own play sits under that story's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The action bar names a story played by its external id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The play screen draws what play has revealed rather than everything the story knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The facts the play discloses beat the facts the design intended.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No check of whether the machinery works takes a turn in a story being played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master asks a mechanic for a number rather than working that number out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story played has a check `<story>-time-passing`, filed with the story before its first turn.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  properties: [
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "instant-property/story-opens-at", required: false, many: false },
    {
      pageProperty: "relation-property/cover-reroll",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/cover-reroll-refused",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/action-draft",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "relation-property/turn-undo",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/turn-undo-refused",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
} as const satisfies PageType
