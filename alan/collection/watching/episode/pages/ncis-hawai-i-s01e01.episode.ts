import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisHawaiIS01e01 = {
  id: "01a1884a-899a-7e22-b2b3-9d83d98a400d",
  type: "page-type/episode",
  slug: "ncis-hawai-i-s01e01",
  description:
    "An experimental Naval aircraft crashes on Oahu, and Tennant and her team must find who is behind it before classified state secrets are exposed.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-hawai-i-season-1"],
  position: 1,
  publishedAt: "2021-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2907207",
      externalLink: "https://www.themoviedb.org/tv/124271/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/t5PQou5TwH3sqjgpfNZqaIxqFHp.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:28.698Z",
  updatedAt: "2026-10-29T15:32:28.698Z",
} as const satisfies Episode
