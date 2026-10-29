import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e04 = {
  id: "01a18843-5080-76d4-9d9b-1af649125299",
  type: "page-type/episode",
  slug: "babylon-5-s03e04",
  description:
    "One of the monks starts having disturbing visions and realizes that his past may not be how he remembers it. Meanwhile, Lyta causes a bit of commotion when she returns from the Vorlon homeworld.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 4,
  publishedAt: "1995-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235958",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/4",
    },
  ],
  title: "Passing Through Gethsemane",
  episodeType: "standard",
  stillPath: "/w5bvTTNKvK3oHTovQW8NYjzc3BL.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
