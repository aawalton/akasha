import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e15 = {
  id: "01a18853-f9b0-79bf-83fc-5cac3c08127d",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e15",
  description:
    "Doza takes the Colossus to a hidden world on the outer rim, only to find it’s inhabited by beings who don’t like them.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 15,
  publishedAt: "2020-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2008965",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/15",
    },
  ],
  title: "The New World",
  episodeType: "standard",
  stillPath: "/gpneTmxYAGdWamMitKPR29AIQbt.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
