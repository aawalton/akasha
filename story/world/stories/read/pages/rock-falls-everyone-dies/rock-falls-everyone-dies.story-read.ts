import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const rockFallsEveryoneDies = {
  id: "01a0657d-ada4-7fe6-8f1d-97fe8b1d6dd5",
  type: "page-type/story-read",
  slug: "rock-falls-everyone-dies",
  title: "Rock falls, everyone dies",
  world: "world/rock-falls-everyone-dies",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "55418",
      externalLink: "https://www.royalroad.com/fiction/55418/rock-falls-everyone-dies",
    },
  ],
  author: "zechamp",
  rank: "C",
  publicationStatus: "completed",
  externalTags: [
    "LitRPG",
    "Anti-Hero Lead",
    "Cultivation",
    "Comedy",
    "Non-Human Lead",
    "Adventure",
    "Fantasy",
    "Satire",
    "High Fantasy",
    "Magic",
    "Strong Lead",
    "Villainous Lead",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
