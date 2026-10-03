import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const story = {
  id: "01a0c987-3949-7828-8fcb-e11a6dec2d37",
  type: "page-type/page-type",
  slug: "story",
  definition: "a telling of what happened in a world",
  icon: "library",
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

    "page-type/chapter",
    "page-type/turn",
    "page-type/world",
    "page-type/lore-disclosure",
    "page-type/lore",
    "domain/story-style",
    "page-type/story-reviewer",
    "page-type/story-recorder",
    "text-property/chapter-break",
    "text-property/coordinator-agent",
    "text-property/player-intent",
    "file-property/phase-timings",
    "multi-relation-property/panels",
    "computed-property/story-color",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
    { pageProperty: "text-property/chapter-break", required: false, many: false },
    { pageProperty: "text-property/coordinator-agent", required: false, many: false },
    { pageProperty: "text-property/player-intent", required: false, many: false },
    { pageProperty: "relation-property/page-domain", required: false, many: false },
    { pageProperty: "multi-relation-property/panels", required: false, many: true, maxCount: null },
    {
      pageProperty: "file-property/phase-timings",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
    { pageProperty: "computed-property/story-color", required: false, many: false },
  ],
  titleColoredBy: "computed-property/story-color",
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
      statement: "Every truth in a world is lore, whoever that truth is known to.",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A story may name a domain, which every seat assigned the story reads with it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
