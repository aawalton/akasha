import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS20e04 = {
  id: "01a18855-c2a0-746d-bd0b-5a0e41de7697",
  type: "page-type/episode",
  slug: "studio-c-s20e04",
  description:
    "A snake bite. Another Earth. A criminal mastermind. Jimmy 2 returns! A sleep study.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-20"],
  position: 4,
  publishedAt: "2025-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6352872",
      externalLink: "https://www.themoviedb.org/tv/68207/season/20/episode/4",
    },
  ],
  title: "Forty Years and Forty Nights",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
