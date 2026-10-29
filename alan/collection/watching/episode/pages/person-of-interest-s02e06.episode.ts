import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e06 = {
  id: "01a18851-3df4-744f-a600-acb5e1a35726",
  type: "page-type/episode",
  slug: "person-of-interest-s02e06",
  description:
    "Reese goes undercover in an idyllic neighborhood when The Machine’s latest number sends him to the suburbs.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 6,
  publishedAt: "2012-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64083",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/6",
    },
  ],
  title: "The High Road",
  episodeType: "standard",
  stillPath: "/mzcvXHYcaEbRpQC1DRHTNz1FOFs.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
