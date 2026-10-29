import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e01 = {
  id: "01a18852-a9f4-741f-b6b4-eb7548c60302",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e01",
  description:
    "While patrolling Federation space, the U.S.S. Shenzhou encounters an object of unknown origin, putting First Officer Michael Burnham to her greatest test yet.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 1,
  publishedAt: "2017-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1330320",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/1",
    },
  ],
  title: "The Vulcan Hello",
  episodeType: "standard",
  stillPath: "/kdE6I9aLZgPJMdFkCuQ0YzemP14.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
