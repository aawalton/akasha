import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e01 = {
  id: "01a18843-5083-7bc8-9dbb-d44bd8e21537",
  type: "page-type/episode",
  slug: "babylon-5-s05e01",
  description:
    "Lochley takes command of Babylon 5 and Byron petitions her for asylum aboard the station. An assassin pledges to kill Sheridan at his inauguration.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 1,
  publishedAt: "1998-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235899",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/1",
    },
  ],
  title: "No Compromises",
  episodeType: "standard",
  stillPath: "/kbx75JlbBmqBzq4jQu2Shuu8znT.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
