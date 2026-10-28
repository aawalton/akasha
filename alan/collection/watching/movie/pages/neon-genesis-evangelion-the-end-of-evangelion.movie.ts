import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const neonGenesisEvangelionTheEndOfEvangelion = {
  id: "01a183d4-c540-7ee7-850d-edc9960d93c7",
  type: "page-type/movie",
  slug: "neon-genesis-evangelion-the-end-of-evangelion",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "1997-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "18491", externalLink: "https://www.themoviedb.org/movie/18491" },
  ],
  title: "Neon Genesis Evangelion: The End of Evangelion",
  createdAt: "2026-10-28T18:45:21.856Z",
  updatedAt: "2026-10-28T18:45:21.856Z",
} as const satisfies Movie
