import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChickenSistersS01e01 = {
  id: "01a18856-798f-7d6b-acfc-8698c5553ece",
  type: "page-type/episode",
  slug: "the-chicken-sisters-s01e01",
  description:
    "Sisters Amanda and Mae are reunited when reality show KITCHEN CLASH comes to their town, and the competition between their two feuding restaurants heats up.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-chicken-sisters-season-1"],
  position: 1,
  publishedAt: "2024-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5361647",
      externalLink: "https://www.themoviedb.org/tv/254988/season/1/episode/1",
    },
  ],
  title: "Welcome to Merinac, Y'all!",
  episodeType: "standard",
  stillPath: "/2W71xeWxn8gMSaDLDd0NsmVPPUJ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:31.022Z",
  updatedAt: "2026-10-29T15:45:31.022Z",
} as const satisfies Episode
