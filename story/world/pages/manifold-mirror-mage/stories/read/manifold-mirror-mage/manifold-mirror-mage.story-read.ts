import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const manifoldMirrorMage = {
  id: "01a166ab-25a0-7f76-98e0-4fc54bed317a",
  type: "page-type/story-read",
  slug: "manifold-mirror-mage",
  author: "Karnevale",
  following: false,
  unit: "unit/words",
  title: "Manifold Mirror Mage",
  world: "world/manifold-mirror-mage",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "91612",
      externalLink: "https://www.royalroad.com/fiction/91612/manifold-mirror-mage",
    },
  ],
  externalTags: ["LitRPG", "Progression", "Adventure", "Fantasy", "Dungeon Crawler", "Magic"],
  publicationStatus: "ongoing",
  readLater: true,
  createdAt: "2026-10-23T02:50:54.752Z",
  updatedAt: "2026-10-23T02:50:54.752Z",
} as const satisfies StoryRead
