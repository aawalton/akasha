import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e11 = {
  id: "01a18852-d42f-7f85-bfaa-ca19dd3bf225",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e11",
  description:
    "When the Enterprise comes in contact with an alien vessel transporting stargazers to observe a spectacular stellar event, Archer invites them aboard the ship not realizing that Silik, a Suliban enemy, is among them. Archer quickly realizes that Silik is engaged in a nefarious time-travelling mission and must stop him before he can tamper with the course of history.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 11,
  publishedAt: "2001-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003520",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/11",
    },
  ],
  title: "Cold Front",
  episodeType: "standard",
  stillPath: "/dmHucOog1LiWb3Tp6govyictYIl.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
