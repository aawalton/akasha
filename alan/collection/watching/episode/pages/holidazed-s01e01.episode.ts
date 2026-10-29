import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const holidazedS01e01 = {
  id: "01a18849-8998-758d-86be-4582c4d41bce",
  type: "page-type/episode",
  slug: "holidazed-s01e01",
  description:
    "A neighborhood of families rush home for the holidays, ready to share in the chaos and joy of the season.-",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/holidazed-season-1"],
  position: 1,
  publishedAt: "2024-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4475264",
      externalLink: "https://www.themoviedb.org/tv/227311/season/1/episode/1",
    },
  ],
  title: "The Beginning",
  episodeType: "standard",
  stillPath: "/eLmF0EsyLkBfIKic8VXModxaNUY.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:31:23.159Z",
  updatedAt: "2026-10-29T15:31:23.159Z",
} as const satisfies Episode
