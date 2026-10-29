import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e06 = {
  id: "01a18849-08b1-7c62-a060-652abc49186d",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e06",
  description:
    "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 6,
  publishedAt: "2011-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63061",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/6",
    },
  ],
  title: "A Golden Crown",
  episodeType: "standard",
  stillPath: "/eU7iftaj8ZTy4WADhEURDM75CSv.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
