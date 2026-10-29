import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const creatureCommandosS01e01 = {
  id: "01a18844-7d9d-7436-81bf-bca3953d4df1",
  type: "page-type/episode",
  slug: "creature-commandos-s01e01",
  description:
    "Amanda Waller assembles the Creature Commandos -- led by General Rick Flag Sr. -- and sends them to Pokolistan to protect Princess Ilana Rostovic.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/creature-commandos-season-1"],
  position: 1,
  publishedAt: "2024-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4203460",
      externalLink: "https://www.themoviedb.org/tv/219543/season/1/episode/1",
    },
  ],
  title: "The Collywobbles",
  episodeType: "standard",
  stillPath: "/5mCMDiAh0AE4EicA8nY1jr28Kom.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:25:52.413Z",
  updatedAt: "2026-10-29T15:25:52.413Z",
} as const satisfies Episode
