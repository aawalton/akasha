import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e05 = {
  id: "01a18849-08b1-751d-a4f8-ba50b92e7233",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e05",
  description:
    "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 5,
  publishedAt: "2011-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63060",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/5",
    },
  ],
  title: "The Wolf and the Lion",
  episodeType: "standard",
  stillPath: "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
