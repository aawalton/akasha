import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e01 = {
  id: "01a1884a-e0ec-75b2-92ee-96cba2c54f14",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e01",
  description:
    "While Sam and Deeks recover from traumatic torture that will have a lasting impact on their personal and professional relationships, lives are still in jeopardy as the NCIS: LA team searches for stolen nuclear weapons.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 1,
  publishedAt: "2013-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557374",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/1",
    },
  ],
  title: "Ascension",
  episodeType: "standard",
  stillPath: "/8dTPo4zKhv0AbEzSTTeSxhMlwyv.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
