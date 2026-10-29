import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kingSolomonSMinesS01e01 = {
  id: "01a1884a-0ffd-7bec-b3e0-377f21b34ded",
  type: "page-type/episode",
  slug: "king-solomon-s-mines-s01e01",
  description:
    "Safari hunter Allan Quartermain heads to Africa to rescue a man, who had disappeared while searching for King Solomon's lost legendary gold mines.",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["season/king-solomon-s-mines-season-1"],
  position: 1,
  publishedAt: "2004-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1328355",
      externalLink: "https://www.themoviedb.org/tv/19699/season/1/episode/1",
    },
  ],
  title: "Part 1",
  episodeType: "standard",
  stillPath: "/hJDMMutLUCdhqJM61OA1AtAqVqm.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:31:57.565Z",
  updatedAt: "2026-10-29T15:31:57.565Z",
} as const satisfies Episode
