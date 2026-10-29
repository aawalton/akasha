import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e16 = {
  id: "01a18857-c36d-7b73-8b2d-a61a4cd3b6f5",
  type: "page-type/episode",
  slug: "the-office-s07e16",
  description:
    "Michael screens his action film Threat Level Midnight to the office after eleven years of writing, shooting, re-shooting, and editing. The film features Michael as Agent Michael Scarn, Dwight as Scarn's sidekick, and Jim as archnemesis \"Goldenface,\" as well as several people from Michael's past.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 16,
  publishedAt: "2011-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170265",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/16",
    },
  ],
  title: "Threat Level Midnight",
  episodeType: "standard",
  stillPath: "/36Z8Z2jvkqE3Y7vUvyrxiC1dius.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
