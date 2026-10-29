import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wandavisionS01e01 = {
  id: "01a18881-0937-70a6-8651-542837285d9c",
  type: "page-type/episode",
  slug: "wandavision-s01e01",
  description:
    "Wanda and Vision struggle to conceal their powers during dinner with Vision’s boss and his wife.",
  ownLength: 31,
  ownProgress: 31,
  partOfCollections: ["season/wandavision-miniseries"],
  position: 1,
  publishedAt: "2021-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1830976",
      externalLink: "https://www.themoviedb.org/tv/85271/season/1/episode/1",
    },
  ],
  title: "Filmed Before a Live Studio Audience",
  episodeType: "standard",
  stillPath: "/cbe8l0Hnbvu07ePgoOopyWYrcdL.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:32:00.311Z",
  updatedAt: "2026-10-29T16:32:00.311Z",
} as const satisfies Episode
