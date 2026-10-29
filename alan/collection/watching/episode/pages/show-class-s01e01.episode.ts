import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS01e01 = {
  id: "01a18851-e164-702e-9108-8e39a0fdd3a1",
  type: "page-type/episode",
  slug: "show-class-s01e01",
  description:
    "Shay has a crush on Tiny, but believes he only likes girls with big butts. Tristan is running for student council president but Miles is also running. Maya wants to focus on music but her relationship with Zig gets in the way.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/class-season-1"],
  position: 1,
  publishedAt: "2016-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1154592",
      externalLink: "https://www.themoviedb.org/tv/65152/season/1/episode/1",
    },
  ],
  title: "#BootyCall",
  episodeType: "standard",
  stillPath: "/tD60KrwEbNCnK3sPMKSKYOobgCZ.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
