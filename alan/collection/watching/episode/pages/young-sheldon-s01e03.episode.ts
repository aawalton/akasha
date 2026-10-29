import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e03 = {
  id: "01a1885a-2529-77a9-a24f-25c5ddc5dc8f",
  type: "page-type/episode",
  slug: "young-sheldon-s01e03",
  description:
    "When George Sr. is rushed to the emergency room, Connie comes to babysit, and the kids have an adventure getting to the hospital on their own.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 3,
  publishedAt: "2017-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1371006",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/3",
    },
  ],
  title: "Poker, Faith, and Eggs",
  episodeType: "standard",
  stillPath: "/5MI4tX8hjeD1zSpMbv2WbIKsliP.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
