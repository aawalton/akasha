import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const battlestarGalacticaRazor = {
  id: "01a06802-6d98-7013-9f31-69c9f37c1c10",
  type: "page-type/movie",
  slug: "battlestar-galactica-razor",
  title: "Battlestar Galactica: Razor",
  partOfCollections: ["fandom/battlestar-galactica"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-11-12",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/battlestar-galactica-razor-2007",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
