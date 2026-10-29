import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e06 = {
  id: "01a1884b-ef7a-713a-a95b-52fc9a2d8e28",
  type: "page-type/episode",
  slug: "ncis-s18e06",
  description:
    "Following a tip about smuggled weapons, Bishop and Torres engage in a shootout in a former sheriff's residence that's now a historical site, only to find themselves locked in abandoned jail cells there.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 6,
  publishedAt: "2021-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2634031",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/6",
    },
  ],
  title: "1mm",
  episodeType: "standard",
  stillPath: "/A0Rjvp7BSanT7hx1yh1Urgs9lAs.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
