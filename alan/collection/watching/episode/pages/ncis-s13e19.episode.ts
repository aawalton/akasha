import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e19 = {
  id: "01a1884b-ef74-7d01-9a56-26d10c333a64",
  type: "page-type/episode",
  slug: "ncis-s13e19",
  description:
    "A Navy Public Affairs officer is murdered, and the victim's wife and mistress accuse each other of the crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 19,
  publishedAt: "2016-03-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176049",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/19",
    },
  ],
  title: "Reasonable Doubts",
  episodeType: "standard",
  stillPath: "/jOqtslt9LkKA0iLjcOUdCAziZ7X.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
