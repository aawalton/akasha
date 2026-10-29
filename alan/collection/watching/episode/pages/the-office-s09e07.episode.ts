import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e07 = {
  id: "01a18857-c36e-7994-9cd7-41b24412e0fc",
  type: "page-type/episode",
  slug: "the-office-s09e07",
  description:
    "The women of the office try to teach Dwight how to interact with female clients; Angela suspects the senator of cheating; Toby convinces some of the guys to grow mustaches.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 7,
  publishedAt: "2012-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170320",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/7",
    },
  ],
  title: "The Whale",
  episodeType: "standard",
  stillPath: "/80m3XUSqFfCMNw6GpWY2Q1KAesS.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
