import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const story = {
  id: "01a0c987-3949-7828-8fcb-e11a6dec2d37",
  type: "page-type/page-type",
  slug: "story",
  definition: "a telling of what happened in a world",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "story" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stories" },
  ],
  extends: ["page-type/collection"],
  parts: [
    "domain/narrative-production",
    "domain/story-engine",
    "domain/ui",
    "domain/world-lore",
    "page-type/game",
    "page-type/chapter",
    "page-type/mechanic",
    "page-type/world",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story is meant to read is kept apart from the words the story says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message wrapped whole in square brackets speaks to the game master rather than acts in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is the text a reader reads at one sitting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter tells the events that come next rather than states the facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a chapter is read or written or played settles which page type the chapter is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The source a chapter came from is no page type of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story names the world the story is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A truth in a world that no story has told is a sketch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sketch a story has told becomes lore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story engine and story content file sits under `story/`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a world holds sits under that world's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story sits under the world the story is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter sits under the story the chapter is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code one story needs sits under that story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's slug says the chapter's place in its story rather than naming the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders under the world page type mirror the folders under one world's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No story design note holds content another page type would carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of story is a page type extending this one.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
