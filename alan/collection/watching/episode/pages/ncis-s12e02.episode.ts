import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e02 = {
  id: "01a1884b-ef72-7d43-84fc-dc443087f8cf",
  type: "page-type/episode",
  slug: "ncis-s12e02",
  description:
    "When a Navy Lieutenant is killed on his way to a private meeting with the President, the NCIS team must determine if the murder was part of a recent stream of muggings in the area or a targeted hit to keep intel secret.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 2,
  publishedAt: "2014-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010119",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/2",
    },
  ],
  title: "Kill the Messenger",
  episodeType: "standard",
  stillPath: "/b4Zb1Xe5MlZVRLqKjgUKV15NP4W.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
