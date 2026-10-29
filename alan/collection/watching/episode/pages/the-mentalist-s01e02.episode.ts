import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e02 = {
  id: "01a18880-75e4-7d17-abf8-7a7aeed7aa5c",
  type: "page-type/episode",
  slug: "the-mentalist-s01e02",
  description:
    "While Lisbon and her team investigate the murder of a young waitress in the Napa Valley, Jane goes behind Lisbon's back to orchestrate his own undercover operation using Van Pelt as bait.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 2,
  publishedAt: "2008-09-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367688",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/2",
    },
  ],
  title: "Red Hair and Silver Tape",
  episodeType: "standard",
  stillPath: "/7VErwt3ZsyBjcLAXzCy1EJ39NZJ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
