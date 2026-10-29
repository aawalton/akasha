import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e03 = {
  id: "01a1884b-ef73-7533-b6ef-78a0b092d9be",
  type: "page-type/episode",
  slug: "ncis-s13e03",
  description:
    "After a Marine is found murdered in Quantico hours after calling Gibbs to discuss a possible case, Bishop and McGee go undercover as a married couple to run surveillance on a Marine Lieutenant and his wife.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 3,
  publishedAt: "2015-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1110130",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/3",
    },
  ],
  title: "Incognito",
  episodeType: "standard",
  stillPath: "/gHzctGlZd1el062GZ0dTQLucLyN.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
