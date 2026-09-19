import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const motherOfLearning = {
  id: "01a0657d-ada3-7c5a-8f04-35fd3ddd00f4",
  type: "page-type/story-read",
  slug: "mother-of-learning",
  title: "Mother of Learning",
  world: "world/mother-of-learning",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "21220",
      externalLink: "https://www.royalroad.com/fiction/21220/mother-of-learning",
    },
  ],
  author: "nobody103",
  rank: "B",
  publicationStatus: "completed",
  externalTags: ["Time Loop", "Adventure", "Fantasy", "Mystery", "Magic"],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
