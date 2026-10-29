import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e01 = {
  id: "01a1884a-e0f0-774f-8535-80a93814645b",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e01",
  description:
    "After NCIS fails to locate a mole in the department, Under Secretary of Defense Corbin Duggan insists on new leadership and takes over the Los Angeles unit from Hetty and Granger.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 1,
  publishedAt: "2016-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1223145",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/1",
    },
  ],
  title: "High-Value Target (1)",
  episodeType: "standard",
  stillPath: "/puBRpo6Y129HoHtSlCnkmBbCjNd.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
