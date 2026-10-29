import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e21 = {
  id: "01a18852-d431-7d67-87bd-a7b1c40b139d",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e21",
  description:
    "When militants take over a world, the Enterprise crew move to evacuate Denobulan geologists that are deep underground. Meanwhile, Phlox has to save a dying Antaran that refuses treatment due to the history of their races.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 21,
  publishedAt: "2003-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15575",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/21",
    },
  ],
  title: "The Breach",
  episodeType: "standard",
  stillPath: "/xKj33QMpjTDdWUzqxpe4qCTHZIn.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
