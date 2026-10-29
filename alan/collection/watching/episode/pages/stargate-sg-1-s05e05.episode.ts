import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateSg1S05e05 = {
  id: "01a18854-f3f7-7815-b017-487e42e408c3",
  type: "page-type/episode",
  slug: "stargate-sg-1-s05e05",
  description:
    "SG-1 discovers that their recent trip through the Stargate may have inadvertently doomed an entire civilization.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-sg-1-season-5"],
  position: 5,
  publishedAt: "2001-07-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335919",
      externalLink: "https://www.themoviedb.org/tv/4629/season/5/episode/5",
    },
  ],
  title: "Red Sky",
  episodeType: "standard",
  stillPath: "/jl3NCL7fRoG6OIAJG2AYtiE1dd6.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:51.281Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Episode
