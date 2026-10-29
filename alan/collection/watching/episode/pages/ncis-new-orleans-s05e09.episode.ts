import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS05e09 = {
  id: "01a1884b-301c-7408-82f1-e3d63aa72320",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s05e09",
  description:
    "The team investigates the murder of a Navy contractor who secretly lived two lives for decades.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-5"],
  position: 9,
  publishedAt: "2018-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1635433",
      externalLink: "https://www.themoviedb.org/tv/61387/season/5/episode/9",
    },
  ],
  title: "Risk Assessment",
  episodeType: "standard",
  stillPath: "/qO0NsKM3PQ5p0prlWxOkYnSPDdl.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
