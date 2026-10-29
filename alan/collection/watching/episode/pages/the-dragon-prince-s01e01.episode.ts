import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDragonPrinceS01e01 = {
  id: "01a18856-f3da-7ae5-9b15-1b9855529d02",
  type: "page-type/episode",
  slug: "the-dragon-prince-s01e01",
  description:
    "As the human kingdom of Katolis braces for an attack by Moonshadow elves, King Harrow makes plans to send sons Callum and Ezran away to a safe place.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/book-1-moon"],
  position: 1,
  publishedAt: "2018-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1527845",
      externalLink: "https://www.themoviedb.org/tv/81046/season/1/episode/1",
    },
  ],
  title: "Echoes of Thunder",
  episodeType: "standard",
  stillPath: "/7edKFWqUIRbK6AtaHKIkwIuWhtL.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:02.330Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Episode
