import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDragonPrinceS03e01 = {
  id: "01a18856-f3db-7e33-829f-c7e76ea0e1bb",
  type: "page-type/episode",
  slug: "the-dragon-prince-s03e01",
  description:
    "To cross into Xadia, Rayla and Callum must find a way past a fearsome dragon who was blinded in a battle with a human.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/book-3-sun"],
  position: 1,
  publishedAt: "2019-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1947426",
      externalLink: "https://www.themoviedb.org/tv/81046/season/3/episode/1",
    },
  ],
  title: "Sol Regem",
  episodeType: "standard",
  stillPath: "/94441IqeqJ99P0clCjvke7U5hO1.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:02.330Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Episode
