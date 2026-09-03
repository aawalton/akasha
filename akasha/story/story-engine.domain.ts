import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  pageTypeSlug: "domain",
  slug: "story-engine",
  definition: "worlds and their stories, kept true to each other",
  partSlugs: [
    "page-type/story-chapter-played",
    "page-type/story-played",
    "page-type/story-turn-played",
    "page-type/world",
    "page-type/story-design",
    "page-type/story-design-note",
    "page-type/story-wiki-entry",
    "page-type/story-build",
    "page-type/story-decision",
    "domain/world-mechanics",
    "workspace-package/story-engine-core",
    "workspace-package/story-ui",
    "workspace-package/story-tower-core",
    "workspace-package/story-tower-engine",
    "workspace-package/story-tower",
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
  ],
} as const satisfies Domain
