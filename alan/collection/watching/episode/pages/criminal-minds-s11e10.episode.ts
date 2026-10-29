import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e10 = {
  id: "01a18844-d7f4-7dad-a0fa-683beb339e06",
  type: "page-type/episode",
  slug: "criminal-minds-s11e10",
  description: "The BAU searches for an UnSub who may be fascinated with medical experimentation.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 10,
  publishedAt: "2015-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1143136",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/10",
    },
  ],
  title: "Future Perfect",
  episodeType: "mid-season",
  stillPath: "/yXqk3XxTs1Sf5SDt3LjqKmlqm1H.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
