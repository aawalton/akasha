import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e05 = {
  id: "01a18849-08b4-7f35-b8ae-e29b5be06b45",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e05",
  description:
    "Dany makes a difficult decision in Meereen. Jon recruits the help of an unexpected ally. Brienne searches for Sansa. Theon remains under Ramsay's control.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 5,
  publishedAt: "2015-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1051286",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/5",
    },
  ],
  title: "Kill the Boy",
  episodeType: "standard",
  stillPath: "/25HHLKWpNKiy6e7zBhaoysK9hzv.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
