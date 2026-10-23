import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const systemPsion = {
  id: "01a1674d-f174-79fb-acd4-43bfc3030676",
  type: "page-type/story-read",
  slug: "system-psion",
  author: "Khale",
  following: false,
  unit: "unit/words",
  title: "System Psion",
  world: "world/system-psion",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "113794",
      externalLink: "https://www.royalroad.com/fiction/113794/system-psion",
    },
  ],
  externalTags: ["LitRPG", "Progression", "Male Lead", "Action", "Adventure", "Fantasy", "GameLit"],
  readLater: true,
  createdAt: "2026-10-23T05:48:43.764Z",
  updatedAt: "2026-10-23T05:48:43.764Z",
} as const satisfies StoryRead
