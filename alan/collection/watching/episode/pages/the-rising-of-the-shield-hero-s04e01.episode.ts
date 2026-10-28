import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRisingOfTheShieldHeroS04e01 = {
  id: "01a183dd-d7e6-7e92-b346-6d1f75b62600",
  type: "page-type/episode",
  slug: "the-rising-of-the-shield-hero-s04e01",
  description:
    "Naofumi stops at Siltvelt on his journey to Q'ten Lo. The people there worship him as a king.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/the-rising-of-the-shield-hero-season-4"],
  position: 1,
  publishedAt: "2025-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6306794",
      externalLink: "https://www.themoviedb.org/tv/83095/season/4/episode/1",
    },
  ],
  title: "Siltvelt",
  episodeType: "standard",
  stillPath: "/mz1q3UqS5jeilDk1tKvKkYOUnzJ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:55:16.450Z",
  updatedAt: "2026-10-28T18:55:16.450Z",
} as const satisfies Episode
