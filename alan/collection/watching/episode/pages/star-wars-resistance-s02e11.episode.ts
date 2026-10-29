import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e11 = {
  id: "01a18853-f9b0-77ee-9883-ffa472edb745",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e11",
  description:
    "Kaz and Neeku sneak onto a First Order refueling station in order to take an important piece of tech. Plans go awry when they run into Tam and General Hux.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 11,
  publishedAt: "2019-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1992475",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/11",
    },
  ],
  title: "Station to Station",
  episodeType: "standard",
  stillPath: "/tewuX9I5GcCsrVGIVctFowrexsS.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
