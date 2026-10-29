import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e04 = {
  id: "01a18880-75e7-7ad5-bf6f-8f8f33876de4",
  type: "page-type/episode",
  slug: "the-mentalist-s03e04",
  description:
    "Patrick Jane and the CBI team are called in to investigate the murder of a convict who served nine years for rape and murder, but was recently released on DNA evidence.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 4,
  publishedAt: "2010-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367743",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/4",
    },
  ],
  title: "Red Carpet Treatment",
  episodeType: "standard",
  stillPath: "/97mETIrBtLSLdma6fDA0pv1Y05R.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
