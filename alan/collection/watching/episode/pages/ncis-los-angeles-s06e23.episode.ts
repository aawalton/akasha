import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e23 = {
  id: "01a1884a-e0ef-7501-b913-eab15ed44e1e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e23",
  description:
    "Some presumed dead crew members show up from the missing tanker that was involved in Arkady's deal with Russia.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 23,
  publishedAt: "2015-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1055921",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/23",
    },
  ],
  title: "Kolcheck, A.",
  episodeType: "standard",
  stillPath: "/f3PMCsEf2zoyIBhhLN1VrEuvJzq.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
