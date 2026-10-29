import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e16 = {
  id: "01a1884b-ef79-769c-8cf1-9355d02a3eca",
  type: "page-type/episode",
  slug: "ncis-s17e16",
  description:
    "While investigating the suicide of a retired Navy officer who left a rare, valuable - and possibly stolen - coin to the National Museum of the Navy, the team imagines themselves in his life story in order to piece together how the coin ended up in his possession.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 16,
  publishedAt: "2020-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2161050",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/16",
    },
  ],
  title: "Ephemera",
  episodeType: "standard",
  stillPath: "/z64FVrRzCEcu9ricK9d6In5InWA.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
