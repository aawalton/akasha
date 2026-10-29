import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS04e23 = {
  id: "01a18852-7715-74e8-a4e6-5ccf2ec2f5e7",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s04e23",
  description:
    "Stardate: Unknown. Bashir tries to help a planet in the grips of a Dominion-engineered plague that guarantees a painful death.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-4"],
  position: 23,
  publishedAt: "1996-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005799",
      externalLink: "https://www.themoviedb.org/tv/580/season/4/episode/23",
    },
  ],
  title: "The Quickening",
  episodeType: "standard",
  stillPath: "/qoeCTG2nqb6IYASRy5zoULFW3S6.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
