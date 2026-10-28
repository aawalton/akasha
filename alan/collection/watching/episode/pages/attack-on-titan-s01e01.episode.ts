import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS01e01 = {
  id: "01a183d1-6a1f-72ea-a72f-4e759a7adca9",
  type: "page-type/episode",
  slug: "attack-on-titan-s01e01",
  description:
    "After one hundred years of peace, humanity is suddenly reminded of the terror of being at the Titans' mercy.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-1"],
  position: 1,
  publishedAt: "2013-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "65480",
      externalLink: "https://www.themoviedb.org/tv/1429/season/1/episode/1",
    },
  ],
  title: "To You, in 2000 Years: The Fall of Shiganshina (1)",
  episodeType: "standard",
  stillPath: "/e363TDn4uP8jP7kHAXQfHAs6HTR.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
