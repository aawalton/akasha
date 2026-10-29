import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e17 = {
  id: "01a1884a-e0ec-77b8-82ce-d8fa02f00744",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e17",
  description:
    "Sam fears for his family’s safety when his wife is called to resume a former CIA cover after a case suggests ties to the infamous Sidorov and his stolen nuke.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 17,
  publishedAt: "2013-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557365",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/17",
    },
  ],
  title: "Wanted",
  episodeType: "standard",
  stillPath: "/NfH2AwTdaZZgqneNyKBc07jtSg.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
