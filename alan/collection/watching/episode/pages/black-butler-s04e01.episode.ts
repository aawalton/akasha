import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS04e01 = {
  id: "01a183d8-99a7-7ce8-afb6-7791bda5fc73",
  type: "page-type/episode",
  slug: "black-butler-s04e01",
  description:
    'Ciel begins attending England’s prestigious Weston College. This insular school values tradition, is bound by strict discipline, and is ruled by the prefects of its four boarding houses, collectively known as "P4".',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-4"],
  position: 1,
  publishedAt: "2024-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4996555",
      externalLink: "https://www.themoviedb.org/tv/50712/season/4/episode/1",
    },
  ],
  title: "His Butler, at School",
  episodeType: "standard",
  stillPath: "/jhBbcsuEj70d3d8RjJhTuoTz1CJ.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
