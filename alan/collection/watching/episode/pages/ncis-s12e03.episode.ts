import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e03 = {
  id: "01a1884b-ef72-7f51-968e-e864cfa763d4",
  type: "page-type/episode",
  slug: "ncis-s12e03",
  description:
    "Flashbacks into his past help tell the tale for Dr. Mallard as he and Bishop travel to England in search of answers to find out why an Englishman murdered in the United States would have a list of deceased Navy men on his person.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 3,
  publishedAt: "2014-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010120",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/3",
    },
  ],
  title: "So It Goes",
  episodeType: "standard",
  stillPath: "/AggE7BOM2SyNT7S6lhdWtkoWS7F.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
