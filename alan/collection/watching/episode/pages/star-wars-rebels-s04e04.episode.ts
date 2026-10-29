import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e04 = {
  id: "01a18853-ddff-712f-83fd-e6e7a22b0372",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e04",
  description:
    "After being separated from Hera and Kanan, Ezra and Sabine join the desperate quest of Saw Gerrera to hunt down the Empire's elusive secret super weapon.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 4,
  publishedAt: "2017-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382171",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/4",
    },
  ],
  title: "In the Name of the Rebellion (2)",
  episodeType: "standard",
  stillPath: "/vMWbpADF0C4QvZh7OOJHw0lX3rm.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
