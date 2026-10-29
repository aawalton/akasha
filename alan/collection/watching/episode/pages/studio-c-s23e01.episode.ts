import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS23e01 = {
  id: "01a18855-c2a1-7903-bd44-93a57db181ec",
  type: "page-type/episode",
  slug: "studio-c-s23e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-23"],
  position: 1,
  publishedAt: "2026-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7785650",
      externalLink: "https://www.themoviedb.org/tv/68207/season/23/episode/1",
    },
  ],
  title: "Have I Shocked You? with Pete Holmes",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
