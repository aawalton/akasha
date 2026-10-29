import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e07 = {
  id: "01a1884a-400c-772e-bcef-86f910cf0694",
  type: "page-type/episode",
  slug: "manifest-s04e07",
  description:
    "After finding another dead body, Michaela and Jared try to track down a serial killer. Cal goes on a date. Zeke faces old demons.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 7,
  publishedAt: "2022-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3917644",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/7",
    },
  ],
  title: "Romeo",
  episodeType: "standard",
  stillPath: "/tKlx0DX9jIDw9guUXSnJwln3ttP.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
