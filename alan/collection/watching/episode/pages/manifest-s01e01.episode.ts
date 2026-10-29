import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS01e01 = {
  id: "01a1884a-4009-75c1-abf3-533e89c00895",
  type: "page-type/episode",
  slug: "manifest-s01e01",
  description:
    "When Flight 828 lands in New York, Michaela and Ben Stone and the other passengers learn that years have passed, but they haven't aged a day. They reunite with loved ones, piece together their old lives and deal with mysterious voices in their heads.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-1"],
  position: 1,
  publishedAt: "2018-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1509569",
      externalLink: "https://www.themoviedb.org/tv/79696/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/fFirzr3lHUjTXeACGIWmaahPydo.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
