import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e07 = {
  id: "01a18852-a9f7-72a0-9ca7-ace736af710d",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e07",
  description:
    "Tensions rise as representatives from across the galaxy gather to confront the threat of the Dark Matter Anomaly. Zora's new sentience raises difficult questions.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 7,
  publishedAt: "2021-12-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3396837",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/7",
    },
  ],
  title: "...But to Connect",
  episodeType: "standard",
  stillPath: "/bHOTOQeL7j480JQ3SlC4r8E7yjK.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
