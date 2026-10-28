import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS03e01 = {
  id: "01a183d8-99a7-7d84-810b-be66684465d6",
  type: "page-type/episode",
  slug: "black-butler-s03e01",
  description:
    "Our favorite butler and master are back with more tea and cakes, more cutlery-based warfare, and more evil to rout from the London underworld.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-3"],
  position: 1,
  publishedAt: "2014-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997386",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3/episode/1",
    },
  ],
  title: "His Butler, Presenting",
  episodeType: "standard",
  stillPath: "/tg7F7SIJlYvxRor4AyaMGQTC1kB.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
