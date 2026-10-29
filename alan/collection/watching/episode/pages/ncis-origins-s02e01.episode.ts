import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS02e01 = {
  id: "01a1884b-5349-761d-9b1e-0d5c3da3532b",
  type: "page-type/episode",
  slug: "ncis-origins-s02e01",
  description:
    "Gibbs and Franks investigate the disappearance of a young Marine connected to a mysterious compound with a charismatic leader, and Lala’s fate is revealed.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-2"],
  position: 1,
  publishedAt: "2025-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6382844",
      externalLink: "https://www.themoviedb.org/tv/243006/season/2/episode/1",
    },
  ],
  title: "The Funky Bunch",
  episodeType: "standard",
  stillPath: "/pMguh8Hpv7HAs8P1uyD6qNhWNzO.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
