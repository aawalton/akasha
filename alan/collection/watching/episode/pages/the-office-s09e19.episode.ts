import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e19 = {
  id: "01a18857-c36f-7dd9-aa6c-c48b08b65071",
  type: "page-type/episode",
  slug: "the-office-s09e19",
  description:
    "The elevator goes out at the office, forcing everyone to use the stairs. Dwight forces Stanley to make a sales call. Pam and Jim talk to Nellie and Toby about relationship problems. Angela supports her man.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 19,
  publishedAt: "2013-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170332",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/19",
    },
  ],
  title: "Stairmageddon",
  episodeType: "standard",
  stillPath: "/oAue77ie9C2MGFpwCbMIvoPvbNQ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
