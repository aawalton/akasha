import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS06e05 = {
  id: "01a18849-08b4-74a7-b2bc-27a8db333255",
  type: "page-type/episode",
  slug: "game-of-thrones-s06e05",
  description:
    "Tyrion seeks a strange ally. Bran learns a great deal. Brienne goes on a mission. Arya is given a chance to prove herself.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-6"],
  position: 5,
  publishedAt: "2016-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1186954",
      externalLink: "https://www.themoviedb.org/tv/1399/season/6/episode/5",
    },
  ],
  title: "The Door",
  episodeType: "standard",
  stillPath: "/96u7HuryCkPEIN3JkZP336KTSq3.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
