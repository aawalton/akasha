import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS07e07 = {
  id: "01a1887e-1e49-728a-ae38-acd87078f92a",
  type: "page-type/episode",
  slug: "castle-s07e07",
  description:
    "When Castle and Beckett learn that a murder victim may have been poisoned at an Old West-style resort, they visit the resort posing as newlyweds to uncover the truth.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-7"],
  position: 7,
  publishedAt: "2014-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010633",
      externalLink: "https://www.themoviedb.org/tv/1419/season/7/episode/7",
    },
  ],
  title: "Once Upon a Time in the West",
  episodeType: "standard",
  stillPath: "/c8ljJZ6FzPMevd4apOPnn3X8vcp.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
