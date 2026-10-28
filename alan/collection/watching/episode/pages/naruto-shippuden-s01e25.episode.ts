import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e25 = {
  id: "01a183d2-3bd6-73d5-98a8-24db4dc3fff8",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e25",
  description:
    "Sakura destroys the Third Kazekage puppet thanks to a secret antidote she had taken.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 25,
  publishedAt: "2007-08-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761495",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/25",
    },
  ],
  title: "Three Minutes Between Life and Death",
  episodeType: "standard",
  stillPath: "/OT1f9segNUhJmLy2jHRa94l81w.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
