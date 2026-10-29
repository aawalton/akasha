import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const houseOfTheDragonS01e01 = {
  id: "01a18849-a936-7996-9e05-507fecda2612",
  type: "page-type/episode",
  slug: "house-of-the-dragon-s01e01",
  description:
    "Viserys hosts a tournament to celebrate the birth of his second child. Rhaenyra welcomes her uncle Daemon back to the Red Keep.",
  ownLength: 66,
  ownProgress: 0,
  partOfCollections: ["season/house-of-the-dragon-season-1"],
  position: 1,
  publishedAt: "2022-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1971015",
      externalLink: "https://www.themoviedb.org/tv/94997/season/1/episode/1",
    },
  ],
  title: "The Heirs of the Dragon",
  episodeType: "standard",
  stillPath: "/3oumSnkavc4pcMFvPbgWDUTclNb.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:31:31.254Z",
  updatedAt: "2026-10-29T15:31:31.254Z",
} as const satisfies Episode
