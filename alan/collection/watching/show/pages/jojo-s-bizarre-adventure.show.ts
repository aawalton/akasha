import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const jojoSBizarreAdventure = {
  id: "01a183d4-4632-741d-9030-e5513c264081",
  type: "page-type/show",
  slug: "jojo-s-bizarre-adventure",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/jojo-s-bizarre-adventure"],
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45790",
      externalLink: "https://www.themoviedb.org/tv/45790",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "JoJo's Bizarre Adventure",
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Crunchyroll",
    "Crunchyroll Amazon Channel",
    "Hulu",
    "Netflix",
    "Netflix Standard with Ads",
    "Pluto TV",
    "Tubi TV",
  ],
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T19:44:40.306Z",
} as const satisfies Show
