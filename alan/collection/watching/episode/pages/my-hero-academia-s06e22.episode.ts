import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS06e22 = {
  id: "01a183d4-acca-7826-bfea-58cf062e3c4e",
  type: "page-type/episode",
  slug: "my-hero-academia-s06e22",
  description:
    "As Izuku goes off alone in his quest for justice, his classmates realize something is wrong and try to find a way to help him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-6"],
  position: 22,
  publishedAt: "2023-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4118330",
      externalLink: "https://www.themoviedb.org/tv/65930/season/6/episode/22",
    },
  ],
  title: "Friend",
  episodeType: "standard",
  stillPath: "/bMWCBl25zteAeMj7MycB2D99bC2.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
