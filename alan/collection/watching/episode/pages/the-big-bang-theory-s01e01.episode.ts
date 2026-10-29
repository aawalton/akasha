import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS01e01 = {
  id: "01a18856-3ffd-752c-b112-0fd0571e27f8",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s01e01",
  description:
    "Brilliant physicist roommates Leonard and Sheldon meet their new neighbor Penny, who begins showing them that as much as they know about science, they know little about actual living.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-1"],
  position: 1,
  publishedAt: "2007-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64766",
      externalLink: "https://www.themoviedb.org/tv/1418/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/l3rRtcQ3hk0JXjhiRqSqImXUBVO.jpg",
  voteAverage: 7.473,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
