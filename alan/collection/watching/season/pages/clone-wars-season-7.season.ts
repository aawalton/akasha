import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cloneWarsSeason7 = {
  id: "01a18844-6113-76ab-b76b-bb2fe82f127d",
  type: "page-type/season",
  slug: "clone-wars-season-7",
  description:
    "The seventh season of Star Wars: The Clone Wars, subtitled The Final Season, consists of twelve episodes. Story arcs include the Bad Batch, Ahsoka's Journey, and the Siege of Mandalore, the series finale.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/clone-wars"],
  position: 7,
  publishedAt: "2020-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "130578",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7",
    },
  ],
  title: "Clone Wars Season 7",
  posterPath: "/n2cmQLAOOs5ikqBFoIldpLeVCLK.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Season
