import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS01e02 = {
  id: "01a183d8-f257-78ab-a8ef-1e1184c1f36c",
  type: "page-type/episode",
  slug: "vampire-knight-s01e02",
  description:
    "Yuki is busy patrolling the school grounds for Day Class girls who are trying to sneak chocolates to the Night Class boys for St. Xocolatl’s Day.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-1"],
  position: 2,
  publishedAt: "2008-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553024",
      externalLink: "https://www.themoviedb.org/tv/17149/season/1/episode/2",
    },
  ],
  title: "Memories of Blood",
  episodeType: "standard",
  stillPath: "/usgBBdaKEq4Vf5WlDErHAAUCjrc.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
