import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e05 = {
  id: "01a18848-c2b8-7e71-8dac-a580e73ccd54",
  type: "page-type/episode",
  slug: "friends-s01e05",
  description:
    "While Chandler and Phoebe decide to break up with their significant others on the same night, Ross helps Rachel do laundry and considers the evening a first date. Joey has Monica pose as his new girlfriend, because he wants to get back with the girl he just dumped.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 5,
  publishedAt: "1994-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86034",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/5",
    },
  ],
  title: "The One with the East German Laundry Detergent",
  episodeType: "standard",
  stillPath: "/m2PCayytQnoTOf3u4R6Tt737gFL.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
