import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e10 = {
  id: "01a18859-3c6a-745e-adb3-d45ea1831752",
  type: "page-type/episode",
  slug: "torchwood-s02e10",
  description:
    "An old cinema reopens and mysterious horrors of the past return to Cardiff.  Why are people trapped between life and death, questions are asked about the Night Travellers, and what Torchwood can do to stop them.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 10,
  publishedAt: "2008-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21589",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/10",
    },
  ],
  title: "From Out of the Rain",
  episodeType: "standard",
  stillPath: "/z9TVUiBOr10WSMbAIsGu11omHOx.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
