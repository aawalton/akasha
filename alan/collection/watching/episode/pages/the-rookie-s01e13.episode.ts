import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS01e13 = {
  id: "01a18885-4802-71f0-863d-4ade559a4ab8",
  type: "page-type/episode",
  slug: "the-rookie-s01e13",
  description:
    "The rookies become the prime suspects after it is discovered a large sum of money used in a drug bust has gone missing.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-1"],
  position: 13,
  publishedAt: "2019-02-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1677263",
      externalLink: "https://www.themoviedb.org/tv/79744/season/1/episode/13",
    },
  ],
  title: "Caught Stealing",
  episodeType: "standard",
  stillPath: "/n29qYxGE55tgYp43aDw1tCBIsZP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
