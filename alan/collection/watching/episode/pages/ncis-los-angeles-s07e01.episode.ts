import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e01 = {
  id: "01a1884a-e0ef-7e16-97a8-aa0bca698a68",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e01",
  description:
    "Callen embarks on a secret project, leaving Sam and the entire team in the dark. After Hetty demands his operation be shut down, the team is tasked with locating Callen before he finds himself in over his head.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 1,
  publishedAt: "2015-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1108931",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/1",
    },
  ],
  title: "Active Measures",
  episodeType: "standard",
  stillPath: "/pBlShmz6y8FRX5xytfKHNB0itg3.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
