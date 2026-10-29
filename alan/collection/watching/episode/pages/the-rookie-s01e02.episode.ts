import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS01e02 = {
  id: "01a18885-4801-7baa-8448-88920acdb5ea",
  type: "page-type/episode",
  slug: "the-rookie-s01e02",
  description:
    "Talia forces Nolan to confront his personal moral instincts in order to be a good cop after he encounters a kidnapping victim. Lucy is temporarily placed with a new training officer who tests her patience. Jackson must confront his failures head-on if he wants to be an officer.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-1"],
  position: 2,
  publishedAt: "2018-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1595088",
      externalLink: "https://www.themoviedb.org/tv/79744/season/1/episode/2",
    },
  ],
  title: "Crash Course",
  episodeType: "standard",
  stillPath: "/5Y1nLSWsJrWHb4vTpOJ0mb1FHIw.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
