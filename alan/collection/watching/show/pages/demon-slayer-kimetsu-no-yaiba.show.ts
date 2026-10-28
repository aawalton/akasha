import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const demonSlayerKimetsuNoYaiba = {
  id: "01a183d2-f12d-75da-b2fc-2230cf9b3148",
  type: "page-type/show",
  slug: "demon-slayer-kimetsu-no-yaiba",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/demon-slayer"],
  publishedAt: "2019-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "85937",
      externalLink: "https://www.themoviedb.org/tv/85937",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Demon Slayer: Kimetsu no Yaiba",
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
  ],
  createdAt: "2026-10-28T18:43:22.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
