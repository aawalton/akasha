import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e05 = {
  id: "01a18852-a9f7-748d-8c7b-04496fc2d411",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e05",
  description:
    "Burnham and Book race to evacuate a group of stranded colonists in the anomaly’s path as one of the Federation’s brightest scientists comes aboard the U.S.S. Discovery to do high-stakes research with Saru and Stamets.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 5,
  publishedAt: "2021-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3385177",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/5",
    },
  ],
  title: "The Examples",
  episodeType: "standard",
  stillPath: "/b6x4x2z2XflPcmh3iRGr37CdsxS.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
