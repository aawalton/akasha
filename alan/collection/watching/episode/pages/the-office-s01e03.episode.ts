import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS01e03 = {
  id: "01a18857-c365-7b0f-ac25-8a453fe50663",
  type: "page-type/episode",
  slug: "the-office-s01e03",
  description:
    "Michael doesn't want to upset the staff so he gets Dwight to pass on news about the company's reduced health provisions. Fed up with his nosiness, Jim and Pam pretend they are suffering from a variety of conditions including Ebola, Mad Cow Disease, spontaneous dentohydroplosion, hotdog fingers, nano-robot infection...",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-1"],
  position: 3,
  publishedAt: "2005-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170134",
      externalLink: "https://www.themoviedb.org/tv/2316/season/1/episode/3",
    },
  ],
  title: "Health Care",
  episodeType: "standard",
  stillPath: "/b92iKLwxKRGBjKQ2R5k7L9kCPPo.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
