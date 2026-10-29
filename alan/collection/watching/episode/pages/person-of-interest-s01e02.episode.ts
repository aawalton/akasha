import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e02 = {
  id: "01a18851-3df2-7bbb-9191-c95855094885",
  type: "page-type/episode",
  slug: "person-of-interest-s01e02",
  description:
    "Reese and Finch question the machine's reliability when they are asked to investigate a teenager who was killed years earlier; Finch remembers the origin of the machine.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 2,
  publishedAt: "2011-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64056",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/2",
    },
  ],
  title: "Ghosts",
  episodeType: "standard",
  stillPath: "/mgnnOpVzVVzPn1aMIpRDtBQmDw6.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
