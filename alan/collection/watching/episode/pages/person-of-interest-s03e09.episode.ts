import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e09 = {
  id: "01a18851-3df5-7e9a-bb6b-1cb71de83e7d",
  type: "page-type/episode",
  slug: "person-of-interest-s03e09",
  description:
    "The battle to bring a crime organization to justice reaches a new level; Reese's number comes up in the machine.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 9,
  publishedAt: "2013-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970573",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/9",
    },
  ],
  title: "The Crossing",
  episodeType: "standard",
  stillPath: "/w33QFyqhXk2uhKftJiFQqfbSwjl.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
