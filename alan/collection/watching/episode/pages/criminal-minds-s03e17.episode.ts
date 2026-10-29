import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e17 = {
  id: "01a18844-d7e9-7c06-9ca4-4e0ed5631291",
  type: "page-type/episode",
  slug: "criminal-minds-s03e17",
  description:
    "The BAU is called to Miami to investigate a serial killer who appears to have a conflicted sexual identity.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 17,
  publishedAt: "2008-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283217",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/17",
    },
  ],
  title: "In Heat",
  episodeType: "standard",
  stillPath: "/i1SYDVuf8DT5iWNxWzY93DWzy0A.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
