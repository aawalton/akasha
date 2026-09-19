import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theUnexpectedEngagementOfTheMarvelousMr = {
  id: "01a0657d-ada5-7a3e-918a-1c4fffdfd56c",
  type: "page-type/story-read",
  slug: "the-unexpected-engagement-of-the-marvelous-mr",
  title: "The Unexpected Engagement of the Marvelous Mr. Penn",
  world: "world/the-unexpected-engagement-of-the-marvelous-mr",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "54508",
      externalLink:
        "https://www.royalroad.com/fiction/54508/the-unexpected-engagement-of-the-marvelous-mr",
    },
  ],
  author: "rkgoff",
  following: true,
  publicationStatus: "completed",
  externalTags: ["Adventure", "Historical", "Mystery", "Romance Subplot"],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
