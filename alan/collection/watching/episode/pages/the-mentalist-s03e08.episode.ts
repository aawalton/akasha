import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e08 = {
  id: "01a18880-75e7-73e1-990f-e4fb12c07136",
  type: "page-type/episode",
  slug: "the-mentalist-s03e08",
  description:
    "When Jane is kidnapped, Lisbon and the team realize there are many suspects who might want to harm him.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 8,
  publishedAt: "2010-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367747",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/8",
    },
  ],
  title: "Ball of Fire",
  episodeType: "standard",
  stillPath: "/dxMJQQK7AlJPEmUS8vT57pgk6TR.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
