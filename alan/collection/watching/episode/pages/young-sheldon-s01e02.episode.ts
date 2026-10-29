import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e02 = {
  id: "01a1885a-2529-7c0d-a0d4-7acc1eab66ae",
  type: "page-type/episode",
  slug: "young-sheldon-s01e02",
  description:
    "To appease his worried mother, Sheldon employs the techniques of a self-help book to try and make a friend.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 2,
  publishedAt: "2017-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1344588",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/2",
    },
  ],
  title: "Rockets, Communists, and the Dewey Decimal System",
  episodeType: "standard",
  stillPath: "/58W7aYucOsRz4whd0z9fyc7774k.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
