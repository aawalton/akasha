import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e03 = {
  id: "01a18849-3528-7c19-8ac4-34f0034b3bce",
  type: "page-type/episode",
  slug: "good-witch-s03e03",
  description:
    "Two guests at Grey House are immediately at odds, so Cassie uses her magic to bring them together. Sam tries to plan the perfect date for Cassie, but various nuisances keep getting in the way.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 3,
  publishedAt: "2017-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1300322",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/3",
    },
  ],
  title: "Day After Day",
  episodeType: "standard",
  stillPath: "/fsSnvSfTzxoA67bmxLuwYSrt9NH.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
