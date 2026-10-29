import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e11 = {
  id: "01a1884b-ef62-728d-a358-98ee1e0ab25c",
  type: "page-type/episode",
  slug: "ncis-s01e11",
  description:
    "When a Navy commander, who was a technical advisor to a civilian contractor for a Navy weapon, is found dead on the beach, the NCIS team investigate the murder using satellite technology.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 11,
  publishedAt: "2004-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334440",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/11",
    },
  ],
  title: "Eye Spy",
  episodeType: "standard",
  stillPath: "/vMWYMCkGdE3aUTg0UAYkLwv5V27.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
