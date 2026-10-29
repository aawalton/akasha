import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e06 = {
  id: "01a18849-352b-7b6f-a5fe-5b487408b90d",
  type: "page-type/episode",
  slug: "good-witch-s07e06",
  description:
    "When Cassie, Abigail, and Joy toss coins into the historic wishing well, wishes old and new start coming true.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 6,
  publishedAt: "2021-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2960257",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/6",
    },
  ],
  title: "The Wishes",
  episodeType: "standard",
  stillPath: "/jzZZ3gl0qwteG6Z9dpsBlGDqcmj.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
