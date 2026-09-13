import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const azarinthHealer = {
  id: "01a0657d-ada0-76ba-b944-621496feac0f",
  type: "story-read",
  slug: "azarinth-healer",
  title: "Azarinth Healer",
  world: "azarinth-healer",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "16946",
      externalLink: "https://www.royalroad.com/fiction/16946/azarinth-healer",
    },
  ],
  author: "Rhaegar",
  rank: "B",
  externalTags: ["LitRPG", "Female Lead", "Action", "Adventure", "Fantasy", "Magic"],
  unit: "words",
  prose: "txt",
} as const satisfies StoryRead
