import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS02e18 = {
  id: "01a1884b-534a-7a84-88ca-81218462c95c",
  type: "page-type/episode",
  slug: "ncis-origins-s02e18",
  description:
    "With the Camp Pendleton office in danger of being shut down, the team confronts an uncertain future.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-2"],
  position: 18,
  publishedAt: "2026-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7095283",
      externalLink: "https://www.themoviedb.org/tv/243006/season/2/episode/18",
    },
  ],
  title: "Hollywood Ending",
  episodeType: "standard",
  stillPath: "/iBBcuWMfCmHBBxVladwL4TFHcCU.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
