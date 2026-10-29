import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S05e02 = {
  id: "01a18843-5083-7b77-a5c7-d382f505534d",
  type: "page-type/episode",
  slug: "babylon-5-s05e02",
  description:
    "Londo collapses from a heart attack, and must battle with his guilt in a dream state. Delenn learns that Lennier is planing to leave Babylon 5 to join the Rangers.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-wheel-of-fire"],
  position: 2,
  publishedAt: "1998-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235900",
      externalLink: "https://www.themoviedb.org/tv/3137/season/5/episode/2",
    },
  ],
  title: "The Very Long Night of Londo Mollari",
  episodeType: "standard",
  stillPath: "/3MuQV8hRu6Z3N6ZP0o42lZZtMue.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
