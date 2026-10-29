import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS07e01 = {
  id: "01a1887e-1e49-7d64-a073-6f6bfe4d906d",
  type: "page-type/episode",
  slug: "castle-s07e01",
  description:
    "Beckett is called to an accident scene to find Castle's car in a ravine, engulfed in flames.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/castle-season-7"],
  position: 1,
  publishedAt: "2014-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000953",
      externalLink: "https://www.themoviedb.org/tv/1419/season/7/episode/1",
    },
  ],
  title: "Driven",
  episodeType: "standard",
  stillPath: "/pYIgawVPTIrujONyZ3HhEfxBuL6.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
