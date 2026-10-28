import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS04e07 = {
  id: "01a183d8-4898-754e-86ab-a8c08a630630",
  type: "page-type/episode",
  slug: "sailor-moon-s04e07",
  description:
    "Usagi and Chibiusa are excited to discover that a best-selling book was written by an old friend of Makoto's.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-4"],
  position: 7,
  publishedAt: "1995-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992474",
      externalLink: "https://www.themoviedb.org/tv/3570/season/4/episode/7",
    },
  ],
  title: "A Pegasus Page Turner",
  episodeType: "standard",
  stillPath: "/50MHDoa2E77PbSWh7pX6Cur8Whz.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
