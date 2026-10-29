import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e05 = {
  id: "01a18857-c36c-74a7-951b-34ce471214db",
  type: "page-type/episode",
  slug: "the-office-s07e05",
  description:
    "When a competing sales associate steals a Dunder Mifflin client, Michael, Jim and Dwight decide to set up a sting to find out his sales secrets. Andy decides to start a band after finding out a friend from college has a successful music career.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 5,
  publishedAt: "2010-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170270",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/5",
    },
  ],
  title: "The Sting",
  episodeType: "standard",
  stillPath: "/iN7UPFwmTD4ZwMwPGMUZhdOnKIn.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
