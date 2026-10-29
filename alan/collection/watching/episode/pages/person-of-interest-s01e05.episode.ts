import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e05 = {
  id: "01a18851-3df2-7e13-9aaf-6c2fd36de2ba",
  type: "page-type/episode",
  slug: "person-of-interest-s01e05",
  description:
    "Reese and Finch have the added challenge of investigating a Person of Interest who wants nothing to do with their brand of vigilante justice.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 5,
  publishedAt: "2011-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64059",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/5",
    },
  ],
  title: "Judgement",
  episodeType: "standard",
  stillPath: "/JYScXmS1Gq0henpyHhPDxgUO4u.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
