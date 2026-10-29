import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e16 = {
  id: "01a18853-f9b0-75da-a736-12b0195b9ce6",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e16",
  description:
    "Kaz decides to join up with Poe and the Resistance, but things go awry when he discovers the First Order has located the Colossus.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 16,
  publishedAt: "2020-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2008966",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/16",
    },
  ],
  title: "No Place Safe",
  episodeType: "standard",
  stillPath: "/bnqteP5lWFAo0EEOBWSdcyScjGP.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
