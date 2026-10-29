import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e06 = {
  id: "01a18843-507f-7a65-a7a3-d60450226e07",
  type: "page-type/episode",
  slug: "babylon-5-s02e06",
  description:
    'A friend of Talia comes to Babylon 5 to negotiate a deal to help Mars become more self-sufficient, when a man calling out "Free Mars!" electrocutes him.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 6,
  publishedAt: "1994-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235860",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/6",
    },
  ],
  title: "Spider in the Web",
  episodeType: "standard",
  stillPath: "/wQXMFxyEdPbPXCrOj6FoMN0jyV.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
