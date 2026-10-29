import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS04e01 = {
  id: "01a18850-f8be-7097-855f-f8b673af029c",
  type: "page-type/episode",
  slug: "parks-and-recreation-s04e01",
  description:
    "Leslie is torn between Ben and her dreams of running for public office, while Ron braces himself for the arrival of his first wife, the original Tammy.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-4"],
  position: 1,
  publishedAt: "2011-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397672",
      externalLink: "https://www.themoviedb.org/tv/8592/season/4/episode/1",
    },
  ],
  title: "I'm Leslie Knope",
  episodeType: "standard",
  stillPath: "/eCGwh8gtCaUCs9wzyk5r3vi2wzw.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
