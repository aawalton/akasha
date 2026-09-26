import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyPlayed = {
  id: "01a06424-329c-7c08-a753-0e0520e2d22c",
  type: "page-type/page-type",
  slug: "story-played",
  definition: "a story nobody wrote",
  pluralSlug: "stories",
  extends: ["page-type/story"],
  runsTabooCheck: false,
  parts: [
    "file-property/prose",
    "module/action-bar",
    "module/action-bar-sending",
    "module/action-bar-state",
    "module/game-beside",
    "module/game-player-beside",
    "module/played-channel",
    "module/played-panels",
    "module/played-rows",
    "module/played-sheet-rows",
    "module/played-shell",
    "module/played-state-beside",
    "module/prose-beside",
    "page-type/story-chapter-played",
    "page-type/story-element-played",
    "page-type/story-turn-played",
    "relation-property/world",
    "multi-relation-property/panels",
    "text-property/chapter-break",
    "text-property/coordinator-agent",
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
  ],
  types: "ts",
  schema: "jsonl",
  properties: [
    { pageProperty: "multi-relation-property/panels", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "text-property/coordinator-agent", required: false, many: false },
    { pageProperty: "text-property/chapter-break", required: false, many: false },
  ],
} as const satisfies PageType
