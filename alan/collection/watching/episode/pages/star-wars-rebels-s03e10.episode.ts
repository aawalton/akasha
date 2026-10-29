import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e10 = {
  id: "01a18853-ddfe-7f3f-95c5-9d304c5136ba",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e10",
  description: "Maul returns, looking to finally unlock the secrets that he and Ezra desire.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 10,
  publishedAt: "2016-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1244907",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/10",
    },
  ],
  title: "Visions and Voices",
  episodeType: "standard",
  stillPath: "/dsOEs7DVLStpeqz3EyqzqHF3FXk.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
