import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e11 = {
  id: "01a183d4-acc5-7078-9bd4-b62abdeed602",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e11",
  description:
    "All Might’s time is running out as he faces his ultimate nemesis head on. Will he finally be able to defeat All For One once and for all?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 11,
  publishedAt: "2018-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448448",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/11",
    },
  ],
  title: "One For All",
  episodeType: "standard",
  stillPath: "/7kJcLTZsF1Kvxd2ElNz4ybO8UGb.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
