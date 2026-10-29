import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e04 = {
  id: "01a18854-50a7-7961-9d00-d8c6328b7988",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e04",
  description: "Padmé Amidala and C-3PO are caught in the middle of a space battle.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
  position: 4,
  publishedAt: "2008-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286575",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/4",
    },
  ],
  title: "Destroy Malevolence",
  episodeType: "standard",
  stillPath: "/w5ErWyt3nqaYlxe1ISEnuonhhAn.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
