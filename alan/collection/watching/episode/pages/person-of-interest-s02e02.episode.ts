import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e02 = {
  id: "01a18851-3df4-7f69-9767-69919de7d188",
  type: "page-type/episode",
  slug: "person-of-interest-s02e02",
  description:
    "The Machine delivers the number of a cold case that leads Reese ever closer to catching up with Finch and his kidnapper, Root.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 2,
  publishedAt: "2012-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64079",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/2",
    },
  ],
  title: "Bad Code",
  episodeType: "standard",
  stillPath: "/7qzr4UFmVfkmyQ6CQunnTm9XmhR.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
