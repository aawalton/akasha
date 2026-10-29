import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e16 = {
  id: "01a18849-545e-7c41-bbaf-8b849f8713c5",
  type: "page-type/episode",
  slug: "gravity-falls-s01e16",
  description:
    "The twins discover a hidden room inside the Mystery Shack and compete over who should have it.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 16,
  publishedAt: "2013-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871296",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/16",
    },
  ],
  title: "Carpet Diem",
  episodeType: "standard",
  stillPath: "/zjbwpttSwnj6ObBMyz6hmxfshDn.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
