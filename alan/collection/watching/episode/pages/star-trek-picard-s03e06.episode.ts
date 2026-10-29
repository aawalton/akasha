import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e06 = {
  id: "01a18853-07cf-7e2f-8417-9d3ca43ca9be",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e06",
  description:
    "Now on the run, Picard and the skeleton crew of the U.S.S. Titan must break into Starfleet's most top-secret facility to expose a plot that could destroy the Federation. Picard must turn to the only soul in the galaxy who can help: an old friend.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 6,
  publishedAt: "2023-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218555",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/6",
    },
  ],
  title: "The Bounty",
  episodeType: "standard",
  stillPath: "/tUPFKtRIf8F9i2svf3LE5bqR9Ax.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
