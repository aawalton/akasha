import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fairyTailS02e28 = {
  id: "01a183d7-2652-74f4-87ab-e3b151d98c7f",
  type: "page-type/episode",
  slug: "fairy-tail-s02e28",
  description:
    "Gildarts has finally come back to Fairy Tail after a hundred year quest and has news for Natsu concerning Igneel.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/fairy-tail-season-2"],
  position: 28,
  publishedAt: "2011-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908274",
      externalLink: "https://www.themoviedb.org/tv/46261/season/2/episode/28",
    },
  ],
  title: "Gildarts",
  episodeType: "standard",
  stillPath: "/9b4Tr31JCmoiqmDtduVDgxE8azO.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Episode
