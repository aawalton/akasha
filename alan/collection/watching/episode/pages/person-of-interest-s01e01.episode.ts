import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e01 = {
  id: "01a18851-3df2-7301-a0d3-a23ecca679a7",
  type: "page-type/episode",
  slug: "person-of-interest-s01e01",
  description:
    "When the social security number of a young prosecutor comes up, Reese and Finch work together to figure out if their person of interest is the victim or perpetrator.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 1,
  publishedAt: "2011-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64055",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/bew93nhrtP1bmDK85jeNpPv94tF.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
