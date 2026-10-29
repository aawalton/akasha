import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e26 = {
  id: "01a18853-ac8e-7144-9bca-f16fe79b0fa2",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e26",
  description:
    "Stardate: 51978.2. When an alien helps the Voyager crew decode the mysterious encrypted message from Starfleet, the crew learns the whereabouts of a secret experimental starship that may be able to get them back to the Alpha Quadrant within a mere matter of months.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 26,
  publishedAt: "1998-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113192",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/26",
    },
  ],
  title: "Hope and Fear",
  episodeType: "finale",
  stillPath: "/tV2ufhU2kXpACgcSY7EldQrk6tq.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
