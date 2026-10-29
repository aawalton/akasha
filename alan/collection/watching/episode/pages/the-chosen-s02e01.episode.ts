import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS02e01 = {
  id: "01a18856-986a-705c-9e99-b254a07df7b7",
  type: "page-type/episode",
  slug: "the-chosen-s02e01",
  description:
    "Tension builds among the disciples as they wrestle with the increasing fame of Jesus in Samaria. Jesus rebukes Big James and John for their prejudice and, after a near-violent encounter, gives them a new nickname.",
  ownLength: 65,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-2"],
  position: 1,
  publishedAt: "2021-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2845547",
      externalLink: "https://www.themoviedb.org/tv/85077/season/2/episode/1",
    },
  ],
  title: "Thunder",
  episodeType: "standard",
  stillPath: "/veYGGZcBkrrJ73WFtfjPVxmlm3t.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
