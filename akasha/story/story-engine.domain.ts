import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  pageTypeSlug: "domain",
  slug: "story-engine",
  definition: "worlds and their stories, kept true to each other",
  partSlugs: [
    "page-type/story-chapter-played",
    "page-type/story-chapter-read",
    "page-type/story-chapter-written",
    "page-type/story-element-played",
    "page-type/story-played",
    "page-type/story-read",
    "page-type/story-turn-played",
    "page-type/story-written",
    "page-type/world",
    "page-type/world-character",
    "page-type/story-design",
    "page-type/story-design-note",
    "page-type/story-wiki-entry",
    "page-type/story-build",
    "page-type/story-decision",
    "page-type/named-event",
    "page-type/gm-doctrine-pack",
    "domain/world-mechanics",
    "workspace-package/story-engine-core",
    "workspace-package/story-ui",
    "workspace-package/story-tower-core",
    "workspace-package/story-tower-engine",
    "workspace-package/story-tower",
    "workspace-package/wandering-inn",
    "domain/narrative-story-turn-promotion",
  ],
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "Every world the story engine keeps is a page in akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every story the story engine keeps is a page in akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every part of a story the story engine keeps is a page in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "How a story is meant to read is kept apart from what the story says.",
    },
    {
      invariantKind: "absence",
      statement: "No deployed code names one story or one world.",
    },
    {
      invariantKind: "absence",
      statement: "No story engine code sits outside `akasha/story`.",
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
      statement: "What is true in a world that no story has told is a sketch.",
    },
    {
      invariantKind: "departure",
      statement: "A sketch a story has told becomes lore.",
    },
    {
      invariantKind: "gap",
      statement: "Every word a game master is served changes without a deploy.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Lore",
      act: "Change lore only at Alan's asking; a sketch is yours to change.",
      warrant:
        "A chapter read before its lore changed goes false, and nothing re-reads that chapter.",
      aids: [
        "New lore that makes a chapter false is a change.",
        "Take a clash between two pieces of lore to Alan.",
      ],
    },
  ],
} as const satisfies Domain
