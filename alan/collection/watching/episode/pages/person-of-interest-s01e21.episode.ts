import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e21 = {
  id: "01a18851-3df3-73ac-b721-9382b5f2b90d",
  type: "page-type/episode",
  slug: "person-of-interest-s01e21",
  description:
    "Finch gives Reese his birthday off so that his partner doesn't have to face a Number that is tied to Reese's past.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 21,
  publishedAt: "2012-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64076",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/21",
    },
  ],
  title: "Many Happy Returns",
  episodeType: "standard",
  stillPath: "/7moobkQsG5xny14GXvyt2uWacP4.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
