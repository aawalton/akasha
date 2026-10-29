import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e01 = {
  id: "01a1884b-ef73-7a05-9f0f-cf7432fe3030",
  type: "page-type/episode",
  slug: "ncis-s13e01",
  description:
    "After being shot, Gibbs fights for his life aboard a Navy hospital ship, while DiNozzo and Joanna travel to Shanghai to try and take down the Calling.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 1,
  publishedAt: "2015-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105379",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/1",
    },
  ],
  title: "Stop the Bleeding",
  episodeType: "standard",
  stillPath: "/e5DryCvJwsk7ASD5yc6cnR9FJHa.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
