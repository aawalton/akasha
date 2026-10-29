import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e10 = {
  id: "01a18852-a9f5-7b1a-9272-2365508e89d3",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e10",
  description:
    "While in unfamiliar territory, the U.S.S. Discovery crew is forced to get creative in their next efforts to survive opposing and unprecedented forces and return home.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 10,
  publishedAt: "2018-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1391322",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/10",
    },
  ],
  title: "Despite Yourself",
  episodeType: "standard",
  stillPath: "/i3s3R4XjO1DmaffdSOZf0XTiUfT.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
