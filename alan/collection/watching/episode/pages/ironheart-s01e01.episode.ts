import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ironheartS01e01 = {
  id: "01a18849-d64f-7c28-b4fc-39d2d812c1d8",
  type: "page-type/episode",
  slug: "ironheart-s01e01",
  description:
    "Determined to complete her newest armored suit, Riri Williams teams up with Parker Robbins.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ironheart-miniseries"],
  position: 1,
  publishedAt: "2025-06-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2910190",
      externalLink: "https://www.themoviedb.org/tv/114471/season/1/episode/1",
    },
  ],
  title: "Take Me Home",
  episodeType: "standard",
  stillPath: "/aRamHYwekA5oOUsf97hZdhQokK3.jpg",
  voteAverage: 4.827,
  createdAt: "2026-10-29T15:31:42.799Z",
  updatedAt: "2026-10-29T15:31:42.799Z",
} as const satisfies Episode
