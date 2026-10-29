import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS01e04 = {
  id: "01a18844-610b-70eb-b7fb-ac3b17aca847",
  type: "page-type/episode",
  slug: "clone-wars-s01e04",
  description: "Padmé Amidala and C-3PO are caught in the middle of a space battle.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-1"],
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
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
