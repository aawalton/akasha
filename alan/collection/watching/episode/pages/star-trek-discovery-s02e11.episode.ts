import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e11 = {
  id: "01a18852-a9f6-79de-b24c-e38cf674b733",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e11",
  description:
    "Burnham receives the reunion she's been longing for, but it doesn't go quite as she imagined. Georgiou and Tyler sense a disturbing change in Leland.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 11,
  publishedAt: "2019-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1711672",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/11",
    },
  ],
  title: "Perpetual Infinity",
  episodeType: "standard",
  stillPath: "/t7VeyVHVOe3qRIcXxPmQtqrcQCk.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
