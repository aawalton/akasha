import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e50 = {
  id: "01a183d8-0267-7101-b9bf-77d4f74882a1",
  type: "page-type/episode",
  slug: "monster-s01e50",
  description:
    "Lunge investigates the secret behind the Red Rose Mansion. Tenma and Grimmer separate, but Tenma finds himself in trouble.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 50,
  publishedAt: "2005-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749566",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/50",
    },
  ],
  title: "The Rose Mansion",
  episodeType: "standard",
  stillPath: "/ucHFHWlTlFFcFo2swpHW2rH8O2S.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
