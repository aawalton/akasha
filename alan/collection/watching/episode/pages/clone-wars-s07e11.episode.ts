import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS07e11 = {
  id: "01a18844-6113-7b74-be4a-a1f3419a7060",
  type: "page-type/episode",
  slug: "clone-wars-s07e11",
  description:
    "Maul is captured and the Siege of Mandalore is won. But evil lurks elsewhere, and the galaxy will never be the same.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-7"],
  position: 11,
  publishedAt: "2020-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2231674",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/11",
    },
  ],
  title: "Shattered",
  episodeType: "standard",
  stillPath: "/qDjAfr0lay9mssXtHJGnEYeT3Nq.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
