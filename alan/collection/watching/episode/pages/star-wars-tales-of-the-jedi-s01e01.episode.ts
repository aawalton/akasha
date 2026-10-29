import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTalesOfTheJediS01e01 = {
  id: "01a18854-0a2c-7ee3-9c48-45fa19dc0bf1",
  type: "page-type/episode",
  slug: "star-wars-tales-of-the-jedi-s01e01",
  description: "A child goes through a rite of passage with unexpected results.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-tales-of-the-jedi-miniseries"],
  position: 1,
  publishedAt: "2022-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3947794",
      externalLink: "https://www.themoviedb.org/tv/203085/season/1/episode/1",
    },
  ],
  title: "Life and Death",
  episodeType: "standard",
  stillPath: "/eml92TQ7fupbbqDBCPXfOAZepT2.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:51.435Z",
  updatedAt: "2026-10-29T15:42:51.435Z",
} as const satisfies Episode
