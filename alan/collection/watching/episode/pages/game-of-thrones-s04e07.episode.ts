import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e07 = {
  id: "01a18849-08b3-7f2b-b70d-992bd2efc6af",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e07",
  description:
    "Tyrion enlists an unlikely ally. Daario entreats Dany to allow him to do what he does best. Jon's warnings fall on deaf ears.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 7,
  publishedAt: "2014-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63100",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/7",
    },
  ],
  title: "Mockingbird",
  episodeType: "standard",
  stillPath: "/loEv49LmoG5SVHmf2BegG8nJGG0.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
