import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS04e01 = {
  id: "01a18857-4fe5-7cf0-a806-4786ccaab473",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s04e01",
  description:
    "It's been three years since Zaheer poisoned Korra and the members of Team Avatar have moved on with their lives; Kai and Opal help a struggling Earth Kingdom town.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-four-balance"],
  position: 1,
  publishedAt: "2014-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010422",
      externalLink: "https://www.themoviedb.org/tv/33880/season/4/episode/1",
    },
  ],
  title: "After All These Years",
  episodeType: "standard",
  stillPath: "/5FMM9bvo6ENuq2SJS6XDKcDjsA8.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
