import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS02e02 = {
  id: "01a18856-986a-7764-8102-04d6cc42b55f",
  type: "page-type/episode",
  slug: "the-chosen-s02e02",
  description:
    "A mysterious visitor seeks to meet Jesus, but the disciples are hesitant. Tension builds between Simon and Matthew. As the group heads to a new city, word arrives that Jesus’ fame is growing.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-2"],
  position: 2,
  publishedAt: "2021-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2861237",
      externalLink: "https://www.themoviedb.org/tv/85077/season/2/episode/2",
    },
  ],
  title: "I Saw You",
  episodeType: "standard",
  stillPath: "/97LTcBNO5myOVy5tmtO2eXOLBgs.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
