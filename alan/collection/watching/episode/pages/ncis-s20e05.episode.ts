import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e05 = {
  id: "01a1884b-ef81-7e70-b167-dd7d361d676b",
  type: "page-type/episode",
  slug: "ncis-s20e05",
  description: "Agent Parker steps up to protect Director Vance after a terrifying home invasion.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 5,
  publishedAt: "2022-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3993969",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/5",
    },
  ],
  title: "Guardian",
  episodeType: "standard",
  stillPath: "/78Q89N1mg5iCcRry8pvED9mqTu4.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
