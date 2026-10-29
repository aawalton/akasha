import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e01 = {
  id: "01a18852-a9f6-7559-b896-019ac1fe21b4",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e01",
  description:
    "Arriving 930 years in the future, Burnham navigates a galaxy she no longer recognizes while searching for the rest of the U.S.S. Discovery crew.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 1,
  publishedAt: "2020-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2367985",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/1",
    },
  ],
  title: "That Hope Is You (1)",
  episodeType: "standard",
  stillPath: "/d1zubUsMskWBYuj45PjyMZdTHSU.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
