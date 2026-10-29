import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e07 = {
  id: "01a18855-67e4-74af-bf6d-a7c280198a8d",
  type: "page-type/episode",
  slug: "steven-universe-s01e07",
  description:
    "Steven creates a magic bubble around himself and a girl he likes, Connie, to save her from a falling rock, but has no idea how to make it disappear.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 7,
  publishedAt: "2013-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003600",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/7",
    },
  ],
  title: "Bubble Buddies",
  episodeType: "standard",
  stillPath: "/1qRLdyrLlDXsP4ldW2ba5rEsP6n.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
