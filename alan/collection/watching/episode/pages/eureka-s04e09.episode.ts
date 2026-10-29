import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e09 = {
  id: "01a18848-3733-7ec9-9e84-43de2b6878ba",
  type: "page-type/episode",
  slug: "eureka-s04e09",
  description: "When Grant and Carter become stranded, they must race back in time to save Eureka.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 9,
  publishedAt: "2010-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335279",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/9",
    },
  ],
  title: "I'll Be Seeing You",
  episodeType: "standard",
  stillPath: "/tVhPLwSn89dz8idXahZtnGLFEfZ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
