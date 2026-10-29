import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e17 = {
  id: "01a18853-f9b1-7a01-a1e8-e1a9446b8b81",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e17",
  description:
    "Resistance recruits need an escort getting off of Dantooine, but, unfortunately, Tam is assigned to destroy the recruits.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 17,
  publishedAt: "2020-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2008967",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/17",
    },
  ],
  title: "Rebuilding the Resistance",
  episodeType: "standard",
  stillPath: "/w1JEMg8sTkxEy7WSR5rDpCumaZt.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
