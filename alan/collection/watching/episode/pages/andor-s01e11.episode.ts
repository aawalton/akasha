import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e11 = {
  id: "01a18843-1870-7711-b10d-a20754e251aa",
  type: "page-type/episode",
  slug: "andor-s01e11",
  description: "A fugitive once more, Cassian must make his next move before it is too late.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 11,
  publishedAt: "2022-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745392",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/11",
    },
  ],
  title: "Daughter of Ferrix",
  episodeType: "standard",
  stillPath: "/rOkx2912iNCKuh6w5pNT66XzUOP.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
