import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e12 = {
  id: "01a18857-c367-7aa2-ab1d-2cbd583ad2fd",
  type: "page-type/episode",
  slug: "the-office-s03e12",
  description:
    "Michael decided to send his employees out into the field for sales calls. He paired himself up with Andy. He let the veterans choose who they wanted their partners to be. Phyllis chose Karen, Stanley chose Ryan and that left Jim and Dwight paired together. This wasn't the first time Dwight and Jim had done sales calls together.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 12,
  publishedAt: "2007-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170168",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/12",
    },
  ],
  title: "Traveling Salesmen",
  episodeType: "standard",
  stillPath: "/dItiNequ1e11xLaKDQHqCqnekvL.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
