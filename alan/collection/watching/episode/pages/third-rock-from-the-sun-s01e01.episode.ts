import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const thirdRockFromTheSunS01e01 = {
  id: "01a18859-111b-7d3d-b2f2-a072466241a1",
  type: "page-type/episode",
  slug: "third-rock-from-the-sun-s01e01",
  description:
    'The leader of an alien recon party on Earth discovers he has "feelings" for a professor.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/third-rock-from-the-sun-season-1"],
  position: 1,
  publishedAt: "1996-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "953004",
      externalLink: "https://www.themoviedb.org/tv/155/season/1/episode/1",
    },
  ],
  title: "Brains and Eggs",
  episodeType: "standard",
  stillPath: "/bVcsgpz7i5mXwb3bytLBIH9nU8i.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:48:20.891Z",
  updatedAt: "2026-10-29T15:48:20.891Z",
} as const satisfies Episode
