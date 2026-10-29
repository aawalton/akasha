import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e01 = {
  id: "01a18843-d153-7786-b47d-7fedee8fe79e",
  type: "page-type/episode",
  slug: "bluey-s03e01",
  description:
    "Bluey's Father's Day card has to be perfect but she can't decide what to draw! So Mum reminds her about all the fun times she's had with Dad and how he's not so perfect either.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 1,
  publishedAt: "2021-09-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3184754",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/1",
    },
  ],
  title: "Perfect",
  episodeType: "standard",
  stillPath: "/b9X8YYaMz2X5SkPBWFyWvFin34X.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
