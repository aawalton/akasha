import type { Domain } from "../domains/domain.page-type.ts"

export const story = {
  id: "01a06d72-54b4-7352-b7db-4c705f35a431",
  pageTypeSlug: "domain",
  slug: "story",
  definition: "worlds and their stories, kept true to each other",
  partSlugs: [
    "domain/narrative-production",
    "domain/story-engine",
    "domain/narrative-story-turn-promotion",
    "domain/tower",
    "domain/ui",
    "domain/wandering-inn",
    "domain/world-lore",
    "page-type/game",
    "page-type/gm-doctrine-pack",
    "page-type/named-event",
    "page-type/story-build",
    "page-type/story-chapter-played",
    "page-type/story-chapter-read",
    "page-type/story-chapter-written",
    "page-type/story-decision",
    "page-type/story-design",
    "page-type/story-design-note",
    "page-type/story-element-played",
    "page-type/story-played",
    "page-type/story-read",
    "page-type/story-turn-played",
    "page-type/story-wiki-entry",
    "page-type/story-written",
    "page-type/world",
    "page-type/world-character",
    "page-type/world-mechanic",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "How a story is meant to read is kept apart from the words the story says.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message wrapped whole in square brackets speaks to the game master rather than acts in the world.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is the text a reader reads at one sitting.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter tells the events that come next rather than states the facts.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a chapter is read or written or played settles which page type the chapter is.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
    {
      invariantKind: "departure",
      statement: "The source a chapter came from is no page type of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A story names the world the story is of.",
    },
    {
      invariantKind: "departure",
      statement: "A truth in a world that no story has told is a sketch.",
    },
    {
      invariantKind: "departure",
      statement: "A sketch a story has told becomes lore.",
    },
    {
      invariantKind: "departure",
      statement: "Every story engine and story content file sits under `story/`.",
    },
  ],
} as const satisfies Domain
