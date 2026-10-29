import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e02 = {
  id: "01a18849-545f-7f86-ba45-bbc802094e14",
  type: "page-type/episode",
  slug: "gravity-falls-s02e02",
  description:
    "Dipper’s secret journal pages lead him and the gang to the author’s hidden bunker where they find themselves face-to-face with a mysterious figure from Gravity Falls’ lore.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 2,
  publishedAt: "2014-08-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000465",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/2",
    },
  ],
  title: "Into the Bunker",
  episodeType: "standard",
  stillPath: "/5O0HnQ96hGbwMxKrIJg8CwJHz7E.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
