import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS07e12 = {
  id: "01a18852-7718-7d41-beca-1b16ee49ee10",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s07e12",
  description:
    "Stardate: Unknown. The Grand Nagus goes missing in the mirror universe, leading Quark and Rom on a mission to track him down.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-7"],
  position: 12,
  publishedAt: "1999-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005865",
      externalLink: "https://www.themoviedb.org/tv/580/season/7/episode/12",
    },
  ],
  title: "The Emperor's New Cloak",
  episodeType: "standard",
  stillPath: "/7NYvdsNSrdSA7jkjAoWB0BJ5VP3.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
