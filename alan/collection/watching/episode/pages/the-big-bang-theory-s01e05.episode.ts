import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS01e05 = {
  id: "01a18856-3ffd-755d-99b4-f4b868e73568",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s01e05",
  description:
    "Fearing he's wasting his time on Penny, Leonard ends up making a connection with Leslie.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-1"],
  position: 5,
  publishedAt: "2007-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64763",
      externalLink: "https://www.themoviedb.org/tv/1418/season/1/episode/5",
    },
  ],
  title: "The Hamburger Postulate",
  episodeType: "standard",
  stillPath: "/zO3CSyb13PQyzWICp4mmZEUeExp.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
