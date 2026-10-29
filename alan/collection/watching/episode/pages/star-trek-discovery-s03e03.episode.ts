import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e03 = {
  id: "01a18852-a9f6-76d1-98c3-493730ec07dc",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e03",
  description:
    "Reunited with Burnham, Discovery heads to Earth to find out what has happened to the Federation in the last thousand years.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 3,
  publishedAt: "2020-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387210",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/3",
    },
  ],
  title: "People of Earth",
  episodeType: "standard",
  stillPath: "/qXtjIfQVfBFZNSraNvrZF6WX6Fq.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
