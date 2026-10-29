import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e02 = {
  id: "01a1887f-56d2-77ca-bf8a-7019889012e7",
  type: "page-type/episode",
  slug: "scorpion-s02e02",
  description:
    "Team Scorpion heads to Cuba when a woman from Cabe’s past pleads for him to help catch a Serbian war criminal.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/scorpion-season-2"],
  position: 2,
  publishedAt: "2015-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1108963",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/2",
    },
  ],
  title: "Cuba Libre",
  episodeType: "standard",
  stillPath: "/9tP6WIXTTLcdvfJ94VurlxnHRrO.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
