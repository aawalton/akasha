import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS01e11 = {
  id: "01a18881-51a0-791c-9904-f5c26a4fd1af",
  type: "page-type/episode",
  slug: "white-collar-s01e11",
  description:
    "To avoid an international conflict, Peter and Neal have to find a thief who is stealing pieces to a valuable collection.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-1"],
  position: 11,
  publishedAt: "2010-02-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596253",
      externalLink: "https://www.themoviedb.org/tv/21510/season/1/episode/11",
    },
  ],
  title: "Home Invasion",
  episodeType: "standard",
  stillPath: "/A61wYhRXymHuGTgglvBAKrBufV8.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
