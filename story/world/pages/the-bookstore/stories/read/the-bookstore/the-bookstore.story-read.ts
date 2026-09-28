import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const theBookstore = {
  id: "01a0e9b3-1cb1-723d-b7c3-1e1b710e75ff",
  type: "page-type/story-read",
  slug: "the-bookstore",
  author: "MKey",
  following: true,
  unit: "unit/words",
  title: "The Bookstore",
  world: "world/the-bookstore",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "57861",
      externalLink: "https://www.royalroad.com/fiction/57861/the-bookstore",
    },
  ],
  externalTags: [
    "Progression",
    "Strategy",
    "Multiple Lead Characters",
    "Slice of Life",
    "Strong Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Crafting",
    "Female Lead",
    "High Fantasy",
    "Magic",
  ],
  publicationStatus: "hiatus",
} as const satisfies StoryRead
