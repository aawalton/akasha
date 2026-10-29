import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e10 = {
  id: "01a18849-ba0f-7f6a-9594-dc032a6a87dd",
  type: "page-type/episode",
  slug: "inhumans-s02e10",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 10,
  publishedAt: "2026-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903988",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/10",
    },
  ],
  title: "Episode 10",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
