import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e09 = {
  id: "01a183d9-6b68-732f-8185-af349eac2c15",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e09",
  description:
    "The girls take Bocchi out for one last blast before school resumes. Destination: Enoshima!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 9,
  publishedAt: "2022-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3990000",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/9",
    },
  ],
  title: "Enoshima Escar",
  episodeType: "standard",
  stillPath: "/baaLPQ8H0fmn8manNreFNJk909w.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
