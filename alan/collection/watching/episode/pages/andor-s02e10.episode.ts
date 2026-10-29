import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e10 = {
  id: "01a18843-1871-744a-bdd3-63558ae6e5a3",
  type: "page-type/episode",
  slug: "andor-s02e10",
  description: "Lonni Jung taps out. Dedra closes in. Luthen scrambles. Kleya delivers.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 10,
  publishedAt: "2025-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747439",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/10",
    },
  ],
  title: "Make It Stop",
  episodeType: "standard",
  stillPath: "/cXFjpvsArTqeO9mlDh5kW0DoDpO.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
