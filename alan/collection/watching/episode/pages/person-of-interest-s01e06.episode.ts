import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e06 = {
  id: "01a18851-3df2-7a6c-b5a0-2c5ea8229906",
  type: "page-type/episode",
  slug: "person-of-interest-s01e06",
  description:
    "Reese becomes romantically involved with the newest Person of Interest: an attractive woman who isn't all that she seems.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 6,
  publishedAt: "2011-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64060",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/6",
    },
  ],
  title: "The Fix",
  episodeType: "standard",
  stillPath: "/c6cqjYzddSC8NsGrAgpqNT0d94X.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
