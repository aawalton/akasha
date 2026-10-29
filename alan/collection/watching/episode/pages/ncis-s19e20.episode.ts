import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e20 = {
  id: "01a1884b-ef81-7b96-8ff8-71e31ad583f7",
  type: "page-type/episode",
  slug: "ncis-s19e20",
  description:
    "NCIS investigates the unexpected death of a Navy reservist who was an investigative journalist.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 20,
  publishedAt: "2022-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3679921",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/20",
    },
  ],
  title: "All or Nothing",
  episodeType: "standard",
  stillPath: "/7Wny9WHUtmLaYDsvQvSo7NoCrAP.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
