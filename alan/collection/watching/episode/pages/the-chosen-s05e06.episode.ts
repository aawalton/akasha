import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS05e06 = {
  id: "01a18856-986b-76df-b793-1b3bc3ccd835",
  type: "page-type/episode",
  slug: "the-chosen-s05e06",
  description:
    "As Jesus’ followers gather for the Passover meal, His enemies assemble for a man hunt. Judas holds a secret meeting.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/last-supper"],
  position: 6,
  publishedAt: "2025-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5992642",
      externalLink: "https://www.themoviedb.org/tv/85077/season/5/episode/6",
    },
  ],
  title: "Reunions",
  episodeType: "standard",
  stillPath: "/pkPQN73QggcKyA8nGlr4DHmjjs7.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
