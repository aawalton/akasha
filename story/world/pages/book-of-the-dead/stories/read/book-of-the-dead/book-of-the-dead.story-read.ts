import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const bookOfTheDead = {
  id: "01a1755e-e425-765d-8e85-9e5b52c9c535",
  type: "page-type/story-read",
  slug: "book-of-the-dead",
  author: "RinoZ",
  following: false,
  unit: "unit/words",
  title: "Book Of The Dead",
  world: "world/book-of-the-dead",
  prose: "txt",
  externalIdentity: [
    {
      source: "royal-road",
      externalId: "47038",
      externalLink: "https://www.royalroad.com/fiction/47038/book-of-the-dead",
    },
  ],
  externalTags: [
    "LitRPG",
    "Progression",
    "Male Lead",
    "Action",
    "Adventure",
    "Fantasy",
    "Horror",
    "Magic",
  ],
  readLater: true,
  createdAt: "2026-10-25T23:21:55.491Z",
  updatedAt: "2026-10-25T23:21:55.491Z",
} as const satisfies StoryRead
