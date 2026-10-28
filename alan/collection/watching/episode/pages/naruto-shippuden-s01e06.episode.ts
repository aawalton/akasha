import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e06 = {
  id: "01a183d2-3bd4-798f-91ce-f967a5ebc9cd",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e06",
  description:
    "In order to protect his village from Deidara’s explosive clay, Gaara uses his chakra to create a giant sand shield.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 6,
  publishedAt: "2007-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761477",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/6",
    },
  ],
  title: "Mission Cleared",
  episodeType: "standard",
  stillPath: "/k5SJCke8KUXgN9LZ5OfyqMOXRsu.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
