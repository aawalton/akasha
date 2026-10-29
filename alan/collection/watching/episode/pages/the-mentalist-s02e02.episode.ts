import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e02 = {
  id: "01a18880-75e6-77e3-95f2-b579811a2e07",
  type: "page-type/episode",
  slug: "the-mentalist-s02e02",
  description:
    "Lisbon and the team work the case of a State Senator's murdered intern, while Jane simultaneously tries to find out what new information Bosco has uncovered on the Red John case.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 2,
  publishedAt: "2009-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367715",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/2",
    },
  ],
  title: "The Scarlet Letter",
  episodeType: "standard",
  stillPath: "/pfDL2jw3dXizGrcCuIZI8ckhDuX.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
