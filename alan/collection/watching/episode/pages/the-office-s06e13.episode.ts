import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e13 = {
  id: "01a18857-c36b-724a-83d8-e80fd754406b",
  type: "page-type/episode",
  slug: "the-office-s06e13",
  description:
    "A banker representing a potential buyer comes to the Scranton branch to interview the H.R. department before the sale goes through.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 13,
  publishedAt: "2010-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170187",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/13",
    },
  ],
  title: "The Banker",
  episodeType: "standard",
  stillPath: "/nisOv4RtbvTWFSsN12tKwfTndma.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
