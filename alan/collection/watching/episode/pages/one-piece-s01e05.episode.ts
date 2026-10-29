import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e05 = {
  id: "01a18884-52e4-7078-9b4b-82b0d32b5c0f",
  type: "page-type/episode",
  slug: "one-piece-s01e05",
  description:
    "In order to save herself and steal a map to the Grand Line, Nami tricks Luffy into allowing her to turn him over to Buggy.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 5,
  publishedAt: "1999-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "852688",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/5",
    },
  ],
  title: "Fear, Mysterious Power! Pirate Clown Captain Buggy!",
  episodeType: "standard",
  stillPath: "/1N8bpV584Hi4tv1oOLCEmVuaQBx.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
