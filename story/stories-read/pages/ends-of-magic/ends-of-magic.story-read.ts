import type { StoryRead } from "akasha/story/stories-read/story-read.page-type.types.ts"

export const endsOfMagic = {
  id: "01a0657d-ada2-7652-87c4-4a1b6b826c35",
  type: "story-read",
  slug: "ends-of-magic",
  title: "Ends of Magic",
  world: "ends-of-magic",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "57697",
      externalLink: "https://www.royalroad.com/fiction/57697/ends-of-magic",
    },
  ],
  author: "Alexander Olson",
  rank: "B",
  following: true,
  externalTags: [
    "LitRPG",
    "Portal Fantasy / Isekai",
    "Progression",
    "Male Lead",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "High Fantasy",
    "Magic",
    "Technologically Engineered",
  ],
  unit: "words",
  prose: "txt",
} as const satisfies StoryRead
