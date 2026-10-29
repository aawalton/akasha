import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e07 = {
  id: "01a18853-ddfe-7d75-b640-9ce127ee1955",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e07",
  description:
    "Ezra and Sabine team up to tame a rogue, young hotshot pilot and his crew who recklessly risk their lives in a fight to defend their home world from Imperial occupation.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 7,
  publishedAt: "2016-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1241553",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/7",
    },
  ],
  title: "Iron Squadron",
  episodeType: "standard",
  stillPath: "/fJLxhpo2MKytgMtWEnWcsEeiKai.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
