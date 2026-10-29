import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e07 = {
  id: "01a18859-3c69-7fb9-807c-a9aa66d2dbc6",
  type: "page-type/episode",
  slug: "torchwood-s02e07",
  description:
    "Captain Jack resurrects Owen with a resurrection glove, only to find out that the new glove isn't quite what they'd bargained for. Owen, in an undead state, helps the team figure out why he's still around.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 7,
  publishedAt: "2008-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21586",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/7",
    },
  ],
  title: "Dead Man Walking",
  episodeType: "standard",
  stillPath: "/qq4SU7al1keSdxnX4ebXvJfaSdR.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
