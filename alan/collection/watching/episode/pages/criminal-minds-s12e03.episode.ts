import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e03 = {
  id: "01a18844-d7f5-76f0-8ec3-8da3753a74c4",
  type: "page-type/episode",
  slug: "criminal-minds-s12e03",
  description:
    "The BAU welcomes back Emily Prentiss as they are called upon to investigate the disappearance of three women",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 3,
  publishedAt: "2016-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1230073",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/3",
    },
  ],
  title: "Taboo",
  episodeType: "standard",
  stillPath: "/nGOHP9LqAy7EavhyayMf5iTF9jp.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
