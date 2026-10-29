import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS07e10 = {
  id: "01a18856-4005-737e-bf63-ec1c5fef96e9",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s07e10",
  description:
    "Leonard has to deal with the fallout of disproving Sheldon's new scientific discovery. Raj spends a week at Howard and Bernadette's apartment.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-7"],
  position: 10,
  publishedAt: "2013-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968871",
      externalLink: "https://www.themoviedb.org/tv/1418/season/7/episode/10",
    },
  ],
  title: "The Discovery Dissipation",
  episodeType: "standard",
  stillPath: "/eNEHrIcKPR62YiXQNxRZ3VRUjIG.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
