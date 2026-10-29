import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ahsokaS01e01 = {
  id: "01a18843-0b7f-72d0-8202-3c5361a51333",
  type: "page-type/episode",
  slug: "ahsoka-s01e01",
  description:
    "A valuable prisoner escapes New Republic custody; a search for answers reunites two old friends.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/ahsoka-season-1"],
  position: 1,
  publishedAt: "2023-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2552685",
      externalLink: "https://www.themoviedb.org/tv/114461/season/1/episode/1",
    },
  ],
  title: "Part One: Master and Apprentice",
  episodeType: "standard",
  stillPath: "/i29R3K7YgLQvBFtTkMAI7zQ9bHi.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Episode
