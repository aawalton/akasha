import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS20e01 = {
  id: "01a18855-c2a0-7006-bb1b-e33ae7f9f30e",
  type: "page-type/episode",
  slug: "studio-c-s20e01",
  description:
    "A dwarf's puzzling name. A secretive actor. A talking tree. An eye exam. Jack McBrayer guest stars.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-20"],
  position: 1,
  publishedAt: "2025-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6352869",
      externalLink: "https://www.themoviedb.org/tv/68207/season/20/episode/1",
    },
  ],
  title: "I Know You're Not Real with Jack McBrayer",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
