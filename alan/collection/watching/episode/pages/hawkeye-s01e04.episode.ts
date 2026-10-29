import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hawkeyeS01e04 = {
  id: "01a1887e-af9c-78fa-b130-e52116233990",
  type: "page-type/episode",
  slug: "hawkeye-s01e04",
  description:
    "Secrets are revealed and hard truths emerge, culminating in a battle against two opposing forces.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/hawkeye-miniseries"],
  position: 4,
  publishedAt: "2021-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3301367",
      externalLink: "https://www.themoviedb.org/tv/88329/season/1/episode/4",
    },
  ],
  title: "Partners, Am I Right?",
  episodeType: "standard",
  stillPath: "/3K3CPASP9NhbxPwkSvCskRpmzTL.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:29:26.300Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Episode
