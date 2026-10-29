import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS07e12 = {
  id: "01a1887e-1e4a-786c-b520-7dee64dc6284",
  type: "page-type/episode",
  slug: "castle-s07e12",
  description:
    "When a young actress is murdered, the investigation leads Beckett and Castle into the flamboyant world of a telenovela.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-7"],
  position: 12,
  publishedAt: "2015-01-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1031894",
      externalLink: "https://www.themoviedb.org/tv/1419/season/7/episode/12",
    },
  ],
  title: "Private Eye Caramba!",
  episodeType: "standard",
  stillPath: "/k7ks837PJYkArLt32GHEcrrQKue.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
