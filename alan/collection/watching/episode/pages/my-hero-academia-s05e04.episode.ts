import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e04 = {
  id: "01a183d4-acc7-7b48-aa6d-4d58b72e8ed5",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e04",
  description:
    "The Class A team tries to put Shinso and his new equipment to good use in the first match against Class B.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 4,
  publishedAt: "2021-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2817762",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/4",
    },
  ],
  title: "Make It Happen, Shinso!",
  episodeType: "standard",
  stillPath: "/amA3o0B1MVm3c3dqQqz9TE2Mgy3.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
