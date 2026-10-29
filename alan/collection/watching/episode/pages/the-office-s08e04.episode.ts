import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e04 = {
  id: "01a18857-c36d-778e-b78a-75562732d62b",
  type: "page-type/episode",
  slug: "the-office-s08e04",
  description:
    "Andy plants the seeds of trying to impress Robert California by throwing a garden party at Schrute Farms. Andy's parents and brother also attend the event, only to make him feel awkward.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 4,
  publishedAt: "2011-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170293",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/4",
    },
  ],
  title: "Garden Party",
  episodeType: "standard",
  stillPath: "/5jKJcwsaNeiL5XhSQ8iASiFDWIx.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
