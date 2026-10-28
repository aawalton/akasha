import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e07 = {
  id: "01a183d4-acc7-7d6f-bdac-395b7e675901",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e07",
  description:
    "In the third match of the class battles, Honenuki leads the Class B team against a well-balanced Class A team.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 7,
  publishedAt: "2021-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2817765",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/7",
    },
  ],
  title: "Match 3",
  episodeType: "standard",
  stillPath: "/noEVg9zK1I8eQyzIJWXczfNeUAZ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
