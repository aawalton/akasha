import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS01e01 = {
  id: "01a183d7-7cdf-7e55-9097-86de22df5c14",
  type: "page-type/episode",
  slug: "hetalia-s01e01",
  description:
    "It's the \"Meeting Of The World\", and all the nations must come together to solve whatever global problems they can. However, after America starts the conference off on a bizarre note, can the gathered nations even solve the problems they have with each other? After this, it's a leap back in time to WWI...",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-1"],
  position: 1,
  publishedAt: "2009-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797662",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1/episode/1",
    },
  ],
  title: "Meeting of the World",
  episodeType: "standard",
  stillPath: "/dlUJBjxjJ1FSX8dxmkwzHBi0c6c.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
