import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hawkeyeS01e01 = {
  id: "01a1887e-af9c-78d4-b0aa-1f22769f0023",
  type: "page-type/episode",
  slug: "hawkeye-s01e01",
  description:
    "Archer Kate Bishop lands in the middle of a criminal conspiracy, forcing Hawkeye out of retirement.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/hawkeye-miniseries"],
  position: 1,
  publishedAt: "2021-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2670881",
      externalLink: "https://www.themoviedb.org/tv/88329/season/1/episode/1",
    },
  ],
  title: "Never Meet Your Heroes",
  episodeType: "standard",
  stillPath: "/AwCNTaG7VPVwaBRSZkvQUMEfyuZ.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:29:26.300Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Episode
