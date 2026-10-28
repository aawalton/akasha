import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e24 = {
  id: "01a183da-447a-7af0-942c-7a0f3f26dd59",
  type: "page-type/episode",
  slug: "k-on-s02e24",
  description:
    "Graduation day comes and goes. Azusa is happy for her friends but is sad to see them go.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 24,
  publishedAt: "2010-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879103",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/24",
    },
  ],
  title: "Graduation Ceremony!",
  episodeType: "finale",
  stillPath: "/gtXQ6yeUwq8o5nY1nstAWQAVhjP.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
