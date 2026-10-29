import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e09 = {
  id: "01a18852-a9f7-7b41-ac9e-f0a2ad29b81e",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e09",
  description:
    "Captain Burnham and the U.S.S. Discovery race to stop Book and Ruon Tarka from launching a rogue plan that could inadvertently endanger the galaxy.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 9,
  publishedAt: "2022-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3497476",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/9",
    },
  ],
  title: "Rubicon",
  episodeType: "standard",
  stillPath: "/p1qtFPO84IQsyHgtZtp2vv492Gi.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
