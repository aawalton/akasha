import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const lukeCageS01e01 = {
  id: "01a1884a-222a-74e7-afee-740768c34870",
  type: "page-type/episode",
  slug: "luke-cage-s01e01",
  description:
    "With tension building in the streets of Harlem thanks to ruthless club owner Cottonmouth, Luke finds it increasingly difficult to live a quiet life.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-luke-cage-season-1"],
  position: 1,
  publishedAt: "2016-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1045315",
      externalLink: "https://www.themoviedb.org/tv/62126/season/1/episode/1",
    },
  ],
  title: "Moment of Truth",
  episodeType: "standard",
  stillPath: "/hiGvMTr8CwAsiVEgO7vvvty6djs.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:02.217Z",
  updatedAt: "2026-10-29T15:32:02.217Z",
} as const satisfies Episode
