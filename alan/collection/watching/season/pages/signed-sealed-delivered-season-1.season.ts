import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const signedSealedDeliveredSeason1 = {
  id: "01a18851-f6df-720b-b5cc-4af5589c7e24",
  type: "page-type/season",
  slug: "signed-sealed-delivered-season-1",
  description:
    "A group of postal detectives work to solve the mysteries behind undeliverable letters and packages from the past, delivering them when they are needed most.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/signed-sealed-delivered"],
  position: 1,
  publishedAt: "2014-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64499",
      externalLink: "https://www.themoviedb.org/tv/61870/season/1",
    },
  ],
  title: "Signed, Sealed, Delivered Season 1",
  posterPath: "/4GuZpq0QKqlGChO5U8rI5vwu9xU.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:40:35.422Z",
  updatedAt: "2026-10-29T15:40:35.422Z",
} as const satisfies Season
