import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS01e16 = {
  id: "01a183d8-4890-760a-bdd9-7381d74770e1",
  type: "page-type/episode",
  slug: "sailor-moon-s01e16",
  description:
    "Usagi decides to enter a homemade wedding dress contest, while her home economics teacher is targeted by Nephrite.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-1"],
  position: 16,
  publishedAt: "1992-06-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992292",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1/episode/16",
    },
  ],
  title: "Wedding Day Blues",
  episodeType: "standard",
  stillPath: "/6M2WgsTeioziVfmSZ1z5WkTcdmK.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
