import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const heWhoFightsWithMonsters = {
  id: "01a0657d-ada2-72ba-a956-080a1429e994",
  type: "page-type/story-read",
  slug: "he-who-fights-with-monsters",
  title: "He Who Fights With Monsters",
  world: "world/he-who-fights-with-monsters",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "26294",
      externalLink: "https://www.royalroad.com/fiction/26294/he-who-fights-with-monsters",
    },
  ],
  author: "Shirtaloon (Travis Deverell)",
  rank: "A",
  following: true,
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Comedy",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
