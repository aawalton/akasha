import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e02 = {
  id: "01a18853-ac8a-71da-a1e7-3ad7aac6c0f1",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e02",
  description:
    "Stardate: 49005.3. A young Kazon, desperate to prove himself and earn his name, tries to attack Chakotay.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 2,
  publishedAt: "1995-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112968",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/2",
    },
  ],
  title: "Initiations",
  episodeType: "standard",
  stillPath: "/yMqTcG8VSiD79QH5qvTmGmrMTFH.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
