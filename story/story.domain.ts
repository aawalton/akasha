import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const story = {
  id: "01a06d72-54b4-7352-b7db-4c705f35a431",
  type: "page-type/domain",
  slug: "story",
  definition: "worlds and their stories, kept true to each other",
  parts: [
    "domain/narrative-production",
    "domain/story-engine",
    "domain/ui",
    "domain/world-lore",
    "page-type/game",
    "page-type/world",
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
  ],
} as const satisfies Domain
