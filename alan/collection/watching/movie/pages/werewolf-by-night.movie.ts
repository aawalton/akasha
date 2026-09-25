import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const werewolfByNight = {
  id: "01a06802-6d9a-702a-8707-17dc42f33ae9",
  type: "page-type/movie",
  slug: "werewolf-by-night",
  title: "Werewolf by Night",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 39,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/werewolf-by-night-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
