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
    "module/game-beside",
    "module/game-player-beside",
    "module/played-channel",
    "module/played-panels",
    "module/played-rows",
    "module/played-shell",
    "module/prose-beside",
    "page-type/story-chapter-played",
    "page-type/story-element-played",
    "page-type/story-turn-played",
    "relation-property/world",
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
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
