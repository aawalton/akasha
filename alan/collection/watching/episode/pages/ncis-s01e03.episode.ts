import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e03 = {
  id: "01a1884b-ef62-77cb-afbf-ed966adf54c3",
  type: "page-type/episode",
  slug: "ncis-s01e03",
  description:
    "When a Navy commander's body washes up on shore along with the bodies of two drug runners, Gibbs refuses to believe that the sailor who was killed was dirty.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 3,
  publishedAt: "2003-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334431",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/3",
    },
  ],
  title: "Seadog",
  episodeType: "standard",
  stillPath: "/Vezn6ZXas1IcxeG9wCcoHkTZy8.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
