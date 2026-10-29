import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS07e10 = {
  id: "01a18854-50ae-738a-8d43-91d335fbdc70",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s07e10",
  description:
    "The battle for Mandalore continues, and Ahsoka finds herself face to face with Maul.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-7"],
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
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
