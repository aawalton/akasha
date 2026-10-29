import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e02 = {
  id: "01a1884b-ef62-7e82-96fc-1fef613f0133",
  type: "page-type/episode",
  slug: "ncis-s01e02",
  description:
    "During a training exercise, a Marine's parachute fails to open and he crashes into a parked car. The NCIS team head to the scene and have to determine if the Marine's death was accidental or a murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 2,
  publishedAt: "2003-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334432",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/2",
    },
  ],
  title: "Hung Out to Dry",
  episodeType: "standard",
  stillPath: "/iiL0xbw92OaJf8ZOBVkei9rDW8S.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
