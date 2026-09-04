import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const story = {
  id: "01a06d72-54b4-7352-b7db-4c705f35a431",
  pageTypeSlug: "domain",
  slug: "story",
  definition: "worlds and their stories, kept true to each other",
  partSlugs: [
    "domain/story-engine",
    "domain/narrative-story-turn-promotion",
    "domain/tower",
    "domain/ui",
    "domain/wandering-inn",
    "domain/world-mechanics",
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
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "How a story is meant to read is kept apart from what the story says.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message wrapped whole in square brackets speaks to the game master rather than acts in the world.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is what a reader reads at one sitting.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter tells what happens next rather than states what is so.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a chapter is read or written or played settles which page type the chapter is.",
    },
    {
      invariantKind: "departure",
      statement: "The source a chapter came from is no page type of its own.",
    },
    {
      invariantKind: "departure",
      statement: "What is true in a world that no story has told is a sketch.",
    },
    {
      invariantKind: "departure",
      statement: "A sketch a story has told becomes lore.",
    },
  ],
} as const satisfies Domain
