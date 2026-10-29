import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS23e03 = {
  id: "01a18855-c2a1-7275-9aa5-0e81810e6c97",
  type: "page-type/episode",
  slug: "studio-c-s23e03",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-23"],
  position: 3,
  publishedAt: "2026-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7785652",
      externalLink: "https://www.themoviedb.org/tv/68207/season/23/episode/3",
    },
  ],
  title: "Bring Out The Brads",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
