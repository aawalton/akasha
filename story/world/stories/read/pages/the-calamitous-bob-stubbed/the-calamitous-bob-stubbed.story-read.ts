import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theCalamitousBobStubbed = {
  id: "01a0657d-ada5-7aa1-a19d-bf644f86b49a",
  type: "page-type/story-read",
  slug: "the-calamitous-bob-stubbed",
  title: "The Calamitous Bob (stubbed)",
  world: "world/the-calamitous-bob-stubbed",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "44132",
      externalLink: "https://www.royalroad.com/fiction/44132/the-calamitous-bob-stubbed",
    },
  ],
  author: "Mecanimus",
  rank: "A",
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Kingdom Building",
    "Female Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Magic",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
