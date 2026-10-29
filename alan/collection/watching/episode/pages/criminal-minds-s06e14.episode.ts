import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e14 = {
  id: "01a18844-d7ed-7f06-845f-2e10e19b5267",
  type: "page-type/episode",
  slug: "criminal-minds-s06e14",
  description:
    "The team investigates unusual murders in Los Angeles, and more information about Prentiss' past arises.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 14,
  publishedAt: "2011-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283323",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/14",
    },
  ],
  title: "Sense Memory",
  episodeType: "standard",
  stillPath: "/cXDpR2bdRxxnPI6q3Z8lnxe5or6.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
