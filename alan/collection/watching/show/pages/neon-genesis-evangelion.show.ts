import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const neonGenesisEvangelion = {
  id: "01a183d4-bed3-7b6a-ae47-8590b44791b2",
  type: "page-type/show",
  slug: "neon-genesis-evangelion",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "1995-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "890", externalLink: "https://www.themoviedb.org/tv/890" },
  ],
  title: "Neon Genesis Evangelion",
  createdAt: "2026-10-28T18:45:20.209Z",
  updatedAt: "2026-10-28T18:45:20.209Z",
} as const satisfies Show
