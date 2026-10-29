import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e17 = {
  id: "01a18852-d431-71e6-91ab-4a38e7b9c9f6",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e17",
  description:
    "Archer and Tucker are arrested and placed on a prisoner transport heading for a penal colony, Canamar. They won't have a chance to correct this error, as one of the inmates plots a takeover of the ship.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 17,
  publishedAt: "2003-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15572",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/17",
    },
  ],
  title: "Canamar",
  episodeType: "standard",
  stillPath: "/4qlmoAZrGAuoGx8ZP8PZrHxN96G.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
