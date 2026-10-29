import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e06 = {
  id: "01a18852-a9f5-7fb7-af39-0ebda671d6ca",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e06",
  description:
    "The U.S.S. Discovery crew is intrigued by new addition, Lt. Ash Tyler. Sarek seeks Burnham's help, rekindling memories from her past. Admiral Cornwell questions Lorca's tactics.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 6,
  publishedAt: "2017-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1379786",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/6",
    },
  ],
  title: "Lethe",
  episodeType: "standard",
  stillPath: "/ijKL65XIokHKi8DQJfWEIwbPFlk.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
