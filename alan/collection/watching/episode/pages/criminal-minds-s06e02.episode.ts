import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e02 = {
  id: "01a18844-d7ec-76ef-8ae2-91c3401b0438",
  type: "page-type/episode",
  slug: "criminal-minds-s06e02",
  description:
    "While JJ attempts to reunite a family whose daughter has mysteriously disappeared, her BAU family braces for the loss of one of their own.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 2,
  publishedAt: "2010-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283295",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/2",
    },
  ],
  title: "JJ",
  episodeType: "standard",
  stillPath: "/lR3MkBxrZuK0KIn31QpqljciJgS.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
