import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e02 = {
  id: "01a18852-a9f7-7d99-bab5-6a53ba6b2797",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e02",
  description:
    "Saru returns to help the U.S.S. Discovery uncover the mystery of an unusually destructive new force. As Burnham leads the crew, she must also find a way to help Book cope with an unimaginable loss.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 2,
  publishedAt: "2021-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3339410",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/2",
    },
  ],
  title: "Anomaly",
  episodeType: "standard",
  stillPath: "/3FZ6ZAKxQaVS84uymVdYzwOGUOa.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
