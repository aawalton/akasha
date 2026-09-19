import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const dungeonOfKnowledgeComplete = {
  id: "01a0657d-ada2-7efc-86ad-3e719defcc51",
  type: "page-type/story-read",
  slug: "dungeon-of-knowledge-complete",
  title: "Dungeon of Knowledge [Complete]",
  world: "world/dungeon-of-knowledge-complete",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "80744",
      externalLink: "https://www.royalroad.com/fiction/80744/dungeon-of-knowledge-complete",
    },
  ],
  author: "timewalk",
  rank: "A",
  following: true,
  publicationStatus: "completed",
  externalTags: [
    "LitRPG",
    "Progression",
    "Strategy",
    "Multiple Lead Characters",
    "Action",
    "Adventure",
    "Fantasy",
    "Dungeon Core",
    "Dungeon Crawler",
    "Female Lead",
    "High Fantasy",
    "Magic",
    "Non-Human Lead",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
