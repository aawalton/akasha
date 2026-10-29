import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS02e07 = {
  id: "01a1887e-1e3d-7dc5-bc23-acb033958d84",
  type: "page-type/episode",
  slug: "castle-s02e07",
  description:
    "An up-and-coming rock star's body is found in a scene that appears staged from her recent music video.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-2"],
  position: 7,
  publishedAt: "2009-11-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64789",
      externalLink: "https://www.themoviedb.org/tv/1419/season/2/episode/7",
    },
  ],
  title: "Famous Last Words",
  episodeType: "standard",
  stillPath: "/e2G7zwhxXfr4fgJjXxWH7vM3fw6.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
