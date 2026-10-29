import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e16 = {
  id: "01a18855-67e9-7963-8b1d-d85c010f7628",
  type: "page-type/episode",
  slug: "steven-universe-s03e16",
  description:
    "Greg tells Steven the story of the time he and Rose babysat Sour Cream for Vidalia.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 16,
  publishedAt: "2016-07-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1210190",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/16",
    },
  ],
  title: "Greg the Babysitter",
  episodeType: "standard",
  stillPath: "/oXH8EeJEKI7SdynKEIQfdRH1JuE.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
