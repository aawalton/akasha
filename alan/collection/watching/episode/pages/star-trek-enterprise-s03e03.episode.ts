import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e03 = {
  id: "01a18852-d432-763c-8c9a-ebee26c3c0b0",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e03",
  description:
    "On a mission to investigate an abandoned Xindi vessel on a jungle planet, Archer, Reed and Hoshi succumb to a virus that mutates them into a primal life form.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 3,
  publishedAt: "2003-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15599",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/3",
    },
  ],
  title: "Extinction",
  episodeType: "standard",
  stillPath: "/uxJebkOvCdOAD7217y3TPGTA3vy.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
