import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e01 = {
  id: "01a18880-75e7-7127-8f46-7f0892a6893b",
  type: "page-type/episode",
  slug: "the-mentalist-s03e01",
  description:
    "When the CBI investigates the kidnapping of a prominent lawyer and state house lobbyist, the CBI Director wants Jane on the case, but he is uncertain of his future with the unit after his encounter with Red John.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 1,
  publishedAt: "2010-09-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367741",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/1",
    },
  ],
  title: "Red Sky at Night",
  episodeType: "standard",
  stillPath: "/eosP8gJIkyVPCmcpDNzV1nWs8pj.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
