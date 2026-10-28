import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e112 = {
  id: "01a183d1-bb52-78f8-a631-b87b991280d2",
  type: "page-type/episode",
  slug: "naruto-s03e112",
  description:
    "As Shikamaru and the rest of the squad move in, Jirobo, one of the Sound Ninja, traps them within an Earth Dome Prison and sucks up their chakra!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 112,
  publishedAt: "2004-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908089",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/112",
    },
  ],
  title: "Squad Mutiny: Everything Falls Apart!",
  episodeType: "standard",
  stillPath: "/cIYtMft4BDUeDnjKL0yC8AoOlOD.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
