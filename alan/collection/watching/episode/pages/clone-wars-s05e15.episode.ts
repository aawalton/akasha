import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e15 = {
  id: "01a18844-6111-7d90-a5d2-a7fa47e58354",
  type: "page-type/episode",
  slug: "clone-wars-s05e15",
  description:
    "Backed by the criminal underworld, the Sith and Death Watch launch an attack on Mandalore.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 15,
  publishedAt: "2013-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010376",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/15",
    },
  ],
  title: "Shades of Reason",
  episodeType: "standard",
  stillPath: "/4b8LPLtSTONKgCEQWZLSfdg82sg.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
