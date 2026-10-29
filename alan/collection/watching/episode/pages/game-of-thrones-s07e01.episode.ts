import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e01 = {
  id: "01a18849-08b5-75e6-93e5-c880406374fb",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e01",
  description:
    "Jon Snow organizes the defense of the North. Cersei tries to even the odds. Daenerys comes home.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 1,
  publishedAt: "2017-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1233022",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/1",
    },
  ],
  title: "Dragonstone",
  episodeType: "standard",
  stillPath: "/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
