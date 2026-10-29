import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e21 = {
  id: "01a18883-a8af-7551-bf72-61bf639b820f",
  type: "page-type/episode",
  slug: "criminal-minds-s01e21",
  description:
    "The BAU works with the CIA to identify a mole within that organization, whose leaks are putting operatives at risk.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 21,
  publishedAt: "2006-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005471",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/21",
    },
  ],
  title: "Secrets and Lies",
  episodeType: "standard",
  stillPath: "/pqVdAJ64qrnRWnGREsh2VejRhBL.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
