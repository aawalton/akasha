import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e19 = {
  id: "01a183d4-acc5-7eaa-8a26-ecae3dcb5b18",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e19",
  description:
    "The second test of the provisional licensing has begun, and the hero candidates are suddenly thrust into a rescue operation.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 19,
  publishedAt: "2018-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1536332",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/19",
    },
  ],
  title: "Rescue Exercises",
  episodeType: "standard",
  stillPath: "/fD2yK1bua0rWWnAcHMlT72D2Xfp.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
