import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS07e10 = {
  id: "01a18844-6113-76f0-a58b-b08f590f6d60",
  type: "page-type/episode",
  slug: "clone-wars-s07e10",
  description:
    "The battle for Mandalore continues, and Ahsoka finds herself face to face with Maul.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-7"],
  position: 10,
  publishedAt: "2020-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2201895",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/10",
    },
  ],
  title: "The Phantom Apprentice",
  episodeType: "standard",
  stillPath: "/xgruf0QTU2CV6t9ZPuBJWo9Y3SK.jpg",
  voteAverage: 9.6,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
