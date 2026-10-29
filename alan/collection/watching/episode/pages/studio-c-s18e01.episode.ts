import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS18e01 = {
  id: "01a18855-c29f-7bc0-af92-cd9dc4d0e5e6",
  type: "page-type/episode",
  slug: "studio-c-s18e01",
  description:
    "The cast is joined by the original cast for an hour-long epic special commemorating Studio C's 200th episode! Favorite characters make appearances, actors improvise, and tongues get twisted in this celebration of sketch comedy.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-18"],
  position: 1,
  publishedAt: "2024-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5632568",
      externalLink: "https://www.themoviedb.org/tv/68207/season/18/episode/1",
    },
  ],
  title: "200th Episode Extravaganza",
  episodeType: "standard",
  stillPath: "/cPtyBLGsJFHHMabnDXM1aQ3piuG.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
