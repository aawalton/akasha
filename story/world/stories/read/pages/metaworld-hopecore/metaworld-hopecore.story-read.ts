import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const metaworldHopecore = {
  id: "01a0657d-ada3-7a67-aa3f-d781b58e9ddc",
  type: "page-type/story-read",
  slug: "metaworld-hopecore",
  title: "Metaworld HopeCore",
  world: "world/metaworld-hopecore",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "166359",
      externalLink: "https://www.royalroad.com/fiction/166359/metaworld-hopecore",
    },
  ],
  author: "Wutosama",
  following: true,
  publicationStatus: "ongoing",
  externalTags: [
    "LitRPG",
    "Progression",
    "Comedy",
    "Psychological",
    "Female Lead",
    "Contemporary",
    "Drama",
    "Attractive Lead",
    "Cozy",
    "Modern Knowledge",
    "Slice of Life",
  ],
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryRead
