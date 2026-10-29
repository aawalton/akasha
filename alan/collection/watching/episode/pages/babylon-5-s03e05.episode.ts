import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e05 = {
  id: "01a18843-5081-7c11-b6b3-ceacbac21e57",
  type: "page-type/episode",
  slug: "babylon-5-s03e05",
  description:
    "Delenn decides it's time to try to contact some of the first ones and enlists the help of Draal, while Babylon 5 is assigned a political officer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 5,
  publishedAt: "1996-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235959",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/5",
    },
  ],
  title: "Voices of Authority",
  episodeType: "standard",
  stillPath: "/qGTbGRRhOcsREgIafETqJlvQK41.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
