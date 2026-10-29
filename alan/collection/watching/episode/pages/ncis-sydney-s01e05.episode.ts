import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS01e05 = {
  id: "01a1884b-6700-7cb1-bce7-35b6cd877e09",
  type: "page-type/episode",
  slug: "ncis-sydney-s01e05",
  description:
    "The team races to save one of their own when Doc Roy and his dog are involved in a hostage situation at their local dog cafe.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-1"],
  position: 5,
  publishedAt: "2023-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4823454",
      externalLink: "https://www.themoviedb.org/tv/157950/season/1/episode/5",
    },
  ],
  title: "Doggiecino Day Afternoon",
  episodeType: "standard",
  stillPath: "/aAV9InBEzIFxxpnKJcTfvrS4OoE.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
