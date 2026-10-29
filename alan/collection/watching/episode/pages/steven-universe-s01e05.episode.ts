import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e05 = {
  id: "01a18855-67e4-7c0c-b845-6848f6478679",
  type: "page-type/episode",
  slug: "steven-universe-s01e05",
  description:
    "Steven brings a mascot costume to life with a magic shard owned by Pearl to help his friend Peedee with his job, but it backfires when the mascot goes rogue.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 5,
  publishedAt: "2013-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003598",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/5",
    },
  ],
  title: "Frybo",
  episodeType: "standard",
  stillPath: "/yr16qEKAMgpDpl3sWYLsqL3KsUS.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
