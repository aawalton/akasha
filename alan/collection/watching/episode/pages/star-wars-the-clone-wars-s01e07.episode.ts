import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e07 = {
  id: "01a18854-50a8-79e8-ae37-c3e8b151153c",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e07",
  description:
    "Anakin, Ahsoka and replacement droid R3-S6 embark on a dual rescue/sabotage mission when they discover R2-D2 is being held at General Grievous' secret enemy listening post, Skytop Station.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
  position: 7,
  publishedAt: "2008-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286567",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/7",
    },
  ],
  title: "Duel of the Droids",
  episodeType: "standard",
  stillPath: "/iuJVtpnsvCRZszuSipxGKoPNVVY.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
