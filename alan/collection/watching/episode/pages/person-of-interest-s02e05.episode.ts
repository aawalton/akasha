import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e05 = {
  id: "01a18851-3df4-7440-88fd-5fb50142bac5",
  type: "page-type/episode",
  slug: "person-of-interest-s02e05",
  description:
    "Reese must protect an investigative journalist through surreptitious means to avoid becoming part of her story.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 5,
  publishedAt: "2012-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64082",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/5",
    },
  ],
  title: "Bury the Lede",
  episodeType: "standard",
  stillPath: "/st95v0WTg4VKxFT1ciJKL2b8ToG.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
