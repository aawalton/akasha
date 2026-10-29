import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS03e03 = {
  id: "01a18852-7712-712a-8ea4-abb7bcb5f0ac",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s03e03",
  description:
    "Stardate: Unknown. Quark tries to boost his reputation by taking credit for the accidental death of a Klingon in his bar, but lands himself in the middle of a Klingon political struggle.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-3"],
  position: 3,
  publishedAt: "1994-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005753",
      externalLink: "https://www.themoviedb.org/tv/580/season/3/episode/3",
    },
  ],
  title: "The House of Quark",
  episodeType: "standard",
  stillPath: "/sln7QYv1v0SVWNEhj9NiCi04MyW.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
