import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const highPotentialS03e01 = {
  id: "01a18849-7d0f-725f-a025-b8099be6cebc",
  type: "page-type/episode",
  slug: "high-potential-s03e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/high-potential-season-3"],
  position: 1,
  publishedAt: "2027-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7403940",
      externalLink: "https://www.themoviedb.org/tv/226637/season/3/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:19.951Z",
  updatedAt: "2026-10-29T15:31:19.951Z",
} as const satisfies Episode
