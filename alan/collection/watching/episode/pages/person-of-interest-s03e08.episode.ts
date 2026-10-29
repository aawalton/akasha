import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e08 = {
  id: "01a18851-3df5-7b76-a029-8acf29aa3e28",
  type: "page-type/episode",
  slug: "person-of-interest-s03e08",
  description:
    "The machine gives Finch 38 numbers at once; information about Carter's past is revealed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 8,
  publishedAt: "2013-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970560",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/8",
    },
  ],
  title: "Endgame",
  episodeType: "standard",
  stillPath: "/lxV12J024Po0bdSYB0DrODjP1j5.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
