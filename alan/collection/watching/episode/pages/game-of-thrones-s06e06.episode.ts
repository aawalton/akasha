import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS06e06 = {
  id: "01a18849-08b4-7646-ac27-dced1585064d",
  type: "page-type/episode",
  slug: "game-of-thrones-s06e06",
  description:
    "An old foe comes back into the picture. Gilly meets Sam's family. Arya faces a difficult choice. Jaime faces off against the High Sparrow.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-6"],
  position: 6,
  publishedAt: "2016-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1186955",
      externalLink: "https://www.themoviedb.org/tv/1399/season/6/episode/6",
    },
  ],
  title: "Blood of My Blood",
  episodeType: "standard",
  stillPath: "/k01MUth8Xm2y79nvsQ3UF25SN9w.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
