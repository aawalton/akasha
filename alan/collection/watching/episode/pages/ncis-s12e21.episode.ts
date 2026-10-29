import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e21 = {
  id: "01a1884b-ef73-7087-8aee-04d770f56d17",
  type: "page-type/episode",
  slug: "ncis-s12e21",
  description:
    "Gibbs and Bishop travel to Afghanistan after the murder of a Marine in D.C. is linked to a terror group holding another Marine hostage overseas.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 21,
  publishedAt: "2015-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1049756",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/21",
    },
  ],
  title: "Lost in Translation",
  episodeType: "standard",
  stillPath: "/4ZdJNLwsbS30HJcfVJDr1y4ThGx.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
