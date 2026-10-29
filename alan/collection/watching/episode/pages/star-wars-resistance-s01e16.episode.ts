import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e16 = {
  id: "01a18853-f9af-771b-abf8-eb0329aec935",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e16",
  description:
    "Poe and Kaz make an unsettling discovery and must evade the First Order when they are spotted by an enemy probe droid.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 16,
  publishedAt: "2019-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1709256",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/16",
    },
  ],
  title: "The Core Problem",
  episodeType: "standard",
  stillPath: "/t1ixH5IG7MUSqYpjA158EqootyJ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
