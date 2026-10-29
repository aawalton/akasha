import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTalesOfTheJediS01e04 = {
  id: "01a18854-0a2c-7436-8bb3-a8fa35fa0f97",
  type: "page-type/episode",
  slug: "star-wars-tales-of-the-jedi-s01e04",
  description: "A Jedi master makes a troubling discovery.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-tales-of-the-jedi-miniseries"],
  position: 4,
  publishedAt: "2022-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3947846",
      externalLink: "https://www.themoviedb.org/tv/203085/season/1/episode/4",
    },
  ],
  title: "The Sith Lord",
  episodeType: "standard",
  stillPath: "/2I2ct24R5FDTLjjFmazkdosaBiC.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:51.435Z",
  updatedAt: "2026-10-29T15:42:51.435Z",
} as const satisfies Episode
