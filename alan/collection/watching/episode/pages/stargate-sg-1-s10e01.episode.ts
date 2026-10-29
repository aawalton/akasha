import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateSg1S10e01 = {
  id: "01a18854-f3fd-7c97-9acb-bd5f7b759ce4",
  type: "page-type/episode",
  slug: "stargate-sg-1-s10e01",
  description:
    "As the Ori invade the Jaffa planet Chulak, Vala and Daniel must deal with their leader: Vala's young daughter, rapidly aged by the Ori to serve their purposes.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-sg-1-season-10"],
  position: 1,
  publishedAt: "2006-07-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "336019",
      externalLink: "https://www.themoviedb.org/tv/4629/season/10/episode/1",
    },
  ],
  title: "Flesh and Blood",
  episodeType: "standard",
  stillPath: "/4TjPNKvrINh2XNhiakjmJZvp1kf.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:43:51.281Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Episode
