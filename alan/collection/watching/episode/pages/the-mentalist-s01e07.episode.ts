import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e07 = {
  id: "01a18880-75e5-7eee-9eb8-4beb99553fdf",
  type: "page-type/episode",
  slug: "the-mentalist-s01e07",
  description:
    'Patrick Jane goes head-to-head with a "psychic" he suspects of murder. Intent on proving the so-called psychic is a fraud -- as well as a killer -- Jane arranges a séance to expose the murderer.',
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 7,
  publishedAt: "2008-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367697",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/7",
    },
  ],
  title: "Seeing Red",
  episodeType: "standard",
  stillPath: "/6bHllIs7gLCGAixAblsk69jyetz.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
