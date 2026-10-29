import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cloneWarsSeason5 = {
  id: "01a18844-6113-73f7-8d65-c6e6a7a59be3",
  type: "page-type/season",
  slug: "clone-wars-season-5",
  description:
    "Season Five is filled with explosive action, exotic worlds, intriguing characters and shocking turns as several major players face their destinies as the galaxy plunges into darkness.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/clone-wars"],
  position: 5,
  publishedAt: "2012-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62850",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5",
    },
  ],
  title: "Clone Wars Season 5",
  posterPath: "/2lTwwcBAZlMlokhJsNCAxQlbU7l.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Season
