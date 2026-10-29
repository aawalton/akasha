import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateUniverseS02e01 = {
  id: "01a18855-2630-7e02-b965-a9f0b7c79e84",
  type: "page-type/episode",
  slug: "stargate-universe-s02e01",
  description:
    "Everett and the crew continue their efforts to save Destiny while holding off the Lucian Alliance invaders.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/stargate-universe-season-2"],
  position: 1,
  publishedAt: "2010-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353560",
      externalLink: "https://www.themoviedb.org/tv/5148/season/2/episode/1",
    },
  ],
  title: "Intervention (3)",
  episodeType: "standard",
  stillPath: "/xMvF8axRrmuu3IJbbI5nYwdlFhO.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:44:04.143Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Episode
