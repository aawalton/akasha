import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e06 = {
  id: "01a18852-a9f6-7d5e-90f6-2d5c50daab3e",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e06",
  description:
    "After receiving a message from Book, Burnham and Georgiou embark on a rogue mission to find him, leaving Saru to pick up the pieces with Admiral Vance. Meanwhile, Stamets forms an unexpected bond with Adira.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 6,
  publishedAt: "2020-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387213",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/6",
    },
  ],
  title: "Scavengers",
  episodeType: "standard",
  stillPath: "/n5arWcgMnw7pINNwKnsldvGQxo8.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
