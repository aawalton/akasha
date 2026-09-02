import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  pageTypeSlug: "domain",
  slug: "story-engine",
  definition: "worlds and their stories, kept true to each other",
  partSlugs: [
    "workspace-package/story-engine-core",
    "workspace-package/story-ui",
    "workspace-package/story-tower-core",
    "workspace-package/story-tower-engine",
    "workspace-package/story-tower",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No deployed code names one story or one world.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message wrapped whole in square brackets speaks to the game master rather than acts in the world.",
    },
  ],
} as const satisfies Domain
