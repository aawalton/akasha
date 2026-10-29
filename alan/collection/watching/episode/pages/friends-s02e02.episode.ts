import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS02e02 = {
  id: "01a18848-c2ba-7fe4-837a-755634420646",
  type: "page-type/episode",
  slug: "friends-s02e02",
  description:
    "The guys are uncomfortable with the thought of Carol's breast milk while Rachel is upset by Monica's growing friendship with Julie. Meanwhile, Joey competes with a fellow cologne spritzer for the affections of a beautiful colleague.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-2"],
  position: 2,
  publishedAt: "1995-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86113",
      externalLink: "https://www.themoviedb.org/tv/1668/season/2/episode/2",
    },
  ],
  title: "The One with the Breast Milk",
  episodeType: "standard",
  stillPath: "/Xeh7qyQmjkRo87bXcZNLHGEcEG.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
