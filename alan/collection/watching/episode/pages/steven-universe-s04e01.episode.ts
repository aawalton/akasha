import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e01 = {
  id: "01a18855-67ea-7212-92bb-b4906927af4e",
  type: "page-type/episode",
  slug: "steven-universe-s04e01",
  description:
    "Steven and Peridot attempt to catch an elusive speedy corrupted Gem monster in the Beta Kindergarten.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 1,
  publishedAt: "2016-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1213488",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/1",
    },
  ],
  title: "Kindergarten Kid",
  episodeType: "standard",
  stillPath: "/2ytDEbXVuspHR9N7shtMjetGPvA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
