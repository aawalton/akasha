import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e22 = {
  id: "01a18844-d7f6-72d4-8d9d-af8451869982",
  type: "page-type/episode",
  slug: "criminal-minds-s12e22",
  description:
    "Derek Morgan brings the BAU a lead in the case against serial killer and escaped convict Mr. Scratch.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 22,
  publishedAt: "2017-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1308555",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/22",
    },
  ],
  title: "Red Light",
  episodeType: "finale",
  stillPath: "/nHPW0ZpnbddIHDPh9tHc7djZk0M.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
