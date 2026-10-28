import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS02e05 = {
  id: "01a183d8-4892-7042-a5a0-7fc6643a2cd4",
  type: "page-type/episode",
  slug: "sailor-moon-s02e05",
  description:
    "A powerful Cardian attacks a cherry blossom viewing party, and Sailor Moon is suddenly unable to fight it.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-2"],
  position: 5,
  publishedAt: "1993-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992347",
      externalLink: "https://www.themoviedb.org/tv/3570/season/2/episode/5",
    },
  ],
  title: "Cherry Blossom Time",
  episodeType: "standard",
  stillPath: "/cZwI1QfuBDtjoThEryoXwwblsfE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
