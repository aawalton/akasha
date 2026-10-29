import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e13 = {
  id: "01a1884a-e0f6-7e33-a9d0-2809f5c60c46",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e13",
  description:
    'When DOJ Agent Lance Hamilton\'s partner is killed, Sam dons his previous undercover persona of "Switch" to find the culprit. Also, Kensi, Deeks, Rountree and Kilbride work to catch an aerospace engineer who stole classified Navy schematics.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 13,
  publishedAt: "2022-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3610282",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/13",
    },
  ],
  title: "Bonafides",
  episodeType: "standard",
  stillPath: "/vYxwSKJsCC3kxQhrLmfDuBeeS3Y.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
