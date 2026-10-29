import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS04e01 = {
  id: "01a18851-e166-7724-97a1-3bc0df782d43",
  type: "page-type/episode",
  slug: "show-class-s04e01",
  description:
    "Grace and Jonah keep their relationship on the DL. Tristan starts back slowly at school. Esme is willing to do whatever it takes to keep her man.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/show-class-season-4"],
  position: 1,
  publishedAt: "2017-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1330716",
      externalLink: "https://www.themoviedb.org/tv/65152/season/4/episode/1",
    },
  ],
  title: "#BackToReality",
  episodeType: "standard",
  stillPath: "/gr3g5VVG2yVJs9Oa0WYr0kZxERq.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
