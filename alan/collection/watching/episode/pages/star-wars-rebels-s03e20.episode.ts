import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e20 = {
  id: "01a18853-ddfe-72a6-9dea-60e5265d59db",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e20",
  description:
    "In final preparations for their attack on Lothal, Phoenix Squadron's plans are disrupted when Grand Admiral Thrawn discovers their location.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 20,
  publishedAt: "2017-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275777",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/20",
    },
  ],
  title: "Zero Hour (1)",
  episodeType: "standard",
  stillPath: "/10iM5XjFNp24yuvuPFxHrXigRyp.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
