import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS01e02 = {
  id: "01a18849-3527-7f69-bde2-186dc1abf7ba",
  type: "page-type/episode",
  slug: "good-witch-s01e02",
  description:
    "Middleton's Heritage Festival gets everyone talking; Cassie is back to her bewitching ways as she welcomes a scared young woman to the Grey House but she realizes she's being followed.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-1"],
  position: 2,
  publishedAt: "2015-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044101",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1/episode/2",
    },
  ],
  title: "Running Scared",
  episodeType: "standard",
  stillPath: "/9wQqThwdPKOk3Xs3OGqDJOEorUT.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
