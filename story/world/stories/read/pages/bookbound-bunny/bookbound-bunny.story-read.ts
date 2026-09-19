import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const bookboundBunny = {
  id: "01a0657d-ada1-7a0f-9ae2-92b48e2e440b",
  type: "page-type/story-read",
  slug: "bookbound-bunny",
  unit: "unit/words",
  title: "Bookbound Bunny",
  world: "world/bookbound-bunny",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "104261",
      externalLink: "https://www.royalroad.com/fiction/104261/bookbound-bunny",
    },
  ],
  externalTags: [
    "Progression",
    "Strategy",
    "Non-Human Lead",
    "Slice of Life",
    "Strong Lead",
    "Adventure",
    "Fantasy",
    "Female Lead",
    "High Fantasy",
    "Magic",
    "School Life",
  ],
} as const satisfies StoryRead
