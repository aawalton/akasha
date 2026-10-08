import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const markOfTheFool = {
  id: "01a0657d-ada3-74df-94f3-3108f9c52354",
  type: "page-type/story-read",
  slug: "mark-of-the-fool",
  title: "Mark of the Fool",
  world: "world/mark-of-the-fool",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "41618",
      externalLink: "https://www.royalroad.com/fiction/41618/mark-of-the-fool",
    },
  ],
  author: "J.M. Clarke (U Juggernaut)",
  following: true,
  grade: "B",
  externalTags: [
    "GameLit",
    "Progression",
    "Strategy",
    "Comedy",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "School Life",
    "Strong Lead",
  ],
  unit: "unit/words",
  prose: "txt",
  createdAt: "2026-09-03T04:18:50.403Z",
  updatedAt: "2026-09-28T20:27:21.000Z",
} as const satisfies StoryRead
