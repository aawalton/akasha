import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e10 = {
  id: "01a1884a-e0ef-77a8-82ca-7be073e48ef6",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e10",
  description:
    "Deeks is arrested and interrogated in connection with the murder of his former partner, while the team tries to prove his innocence.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 10,
  publishedAt: "2015-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1137072",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/10",
    },
  ],
  title: "Internal Affairs",
  episodeType: "standard",
  stillPath: "/AkMpR9yqJPjVnlJgTS74flT8BGK.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
