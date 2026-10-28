import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e06 = {
  id: "01a183d6-325f-772b-8896-6bc1fd849e6d",
  type: "page-type/episode",
  slug: "gintama-s01e06",
  description: "A man tries to break out of jail, to attend a pop star's concert.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 6,
  publishedAt: "2006-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940280",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/6",
    },
  ],
  title: "Keep Your Promise Even If It Kills You",
  episodeType: "standard",
  stillPath: "/9mTV6RyZiqe3auH11b6EgGHjB4Q.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
