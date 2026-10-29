import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e18 = {
  id: "01a18851-3df3-76a3-8acb-1f3eb98035e0",
  type: "page-type/episode",
  slug: "person-of-interest-s01e18",
  description:
    "The Machine's latest number presents a unique challenge for Reese and Finch since the person has virtually no digital footprint - and appears to be leading a double life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 18,
  publishedAt: "2012-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64072",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/18",
    },
  ],
  title: "Identity Crisis",
  episodeType: "standard",
  stillPath: "/mI8TFAw6EpIkMnGldzH2aQqJ4bV.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
