import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e15 = {
  id: "01a18857-c36f-7d40-832c-712cdb21a112",
  type: "page-type/episode",
  slug: "the-office-s09e15",
  description:
    "The staffers pair up as faux couples to score a Valentine's Day discount at a mall. Erin tells Pete that she'll break up with Andy when he returns, but Pete has his doubts. Jim and Pam socialize with the documentary's soundman.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 15,
  publishedAt: "2013-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170327",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/15",
    },
  ],
  title: "Couples Discount",
  episodeType: "standard",
  stillPath: "/8KtuuZvOqAyHyIB7l0gxf2XfgYN.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
