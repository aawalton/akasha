import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e15 = {
  id: "01a1884a-e0ee-7fb2-9536-0e314d6c65ae",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e15",
  description:
    "Callen and Sam end up being abducted during the follow up of an anonymous tip about a missing NSA agent.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 15,
  publishedAt: "2015-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1038376",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/15",
    },
  ],
  title: "Forest for the Trees",
  episodeType: "standard",
  stillPath: "/AtLf3WOtyguOTw1cVbL9pu3S0L5.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
