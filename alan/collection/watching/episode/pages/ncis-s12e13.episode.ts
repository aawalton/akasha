import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e13 = {
  id: "01a1884b-ef72-74a7-8966-5a824806a37a",
  type: "page-type/episode",
  slug: "ncis-s12e13",
  description:
    "Gibbs and the team investigate when a Navy Lieutenant who is set to be the first openly gay service member to receive the Medal of Honor is murdered.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 13,
  publishedAt: "2015-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1035209",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/13",
    },
  ],
  title: "We Build, We Fight",
  episodeType: "standard",
  stillPath: "/lFQAAcloVkwr8rF1YjRHl58NHl2.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
