import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e12 = {
  id: "01a1884b-ef6a-737e-8001-ece990eea414",
  type: "page-type/episode",
  slug: "ncis-s07e12",
  description:
    "Gibbs is worried about Tony's ability to handle his job when Tony's father turns out to be linked to their newest investigation, an assassination attempt on a foreign prince.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 12,
  publishedAt: "2010-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334566",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/12",
    },
  ],
  title: "Flesh and Blood",
  episodeType: "standard",
  stillPath: "/3NQZ26i6fmBfniQTMBTyhPcKrJA.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
