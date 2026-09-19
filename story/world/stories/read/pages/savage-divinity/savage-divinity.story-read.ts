import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const savageDivinity = {
  id: "01a0657d-ada4-7b87-92c2-9f3cfdd6f39d",
  type: "page-type/story-read",
  slug: "savage-divinity",
  ownProgress: 495270,
  rank: "C",
  unit: "unit/words",
  title: "Savage Divinity",
  world: "world/savage-divinity",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "5701",
      externalLink: "https://www.royalroad.com/fiction/5701/savage-divinity",
    },
  ],
  externalTags: [
    "Martial Arts",
    "Slice of Life",
    "Multiple Lovers",
    "Action",
    "Adventure",
    "Fantasy",
  ],
  publicationStatus: "completed",
} as const satisfies StoryRead
