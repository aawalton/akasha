import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS05e06 = {
  id: "01a18881-51a3-79c1-878d-8335a9aedb75",
  type: "page-type/episode",
  slug: "white-collar-s05e06",
  description:
    "Peter and Neal must go undercover as ice skating pros to expose a counterfeit passport ring in Little Odessa.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-5"],
  position: 6,
  publishedAt: "2013-11-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596309",
      externalLink: "https://www.themoviedb.org/tv/21510/season/5/episode/6",
    },
  ],
  title: "Ice Breaker",
  episodeType: "standard",
  stillPath: "/kkVkHG0H9aZn3kHStmotWzUAiBw.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
