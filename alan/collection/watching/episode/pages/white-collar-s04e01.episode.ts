import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e01 = {
  id: "01a18881-51a2-75e6-8d2a-47ec57660d2e",
  type: "page-type/episode",
  slug: "white-collar-s04e01",
  description:
    "Peter tries to find Neal on a remote island before a bounty hunter locates him first.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/white-collar-season-4"],
  position: 1,
  publishedAt: "2012-07-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596292",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/1",
    },
  ],
  title: "Wanted",
  episodeType: "standard",
  stillPath: "/3Dhn2QC24zq2MfUEb2vSsELSH5x.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
