import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS04e13 = {
  id: "01a18857-4fe6-7352-a50b-b5a15e6c5e17",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s04e13",
  description:
    "The fate of the Earth Kingdom and the Avatar's life is at stake, when Korra comes face to face with Kuvira.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-four-balance"],
  position: 13,
  publishedAt: "2014-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019900",
      externalLink: "https://www.themoviedb.org/tv/33880/season/4/episode/13",
    },
  ],
  title: "The Last Stand",
  episodeType: "finale",
  stillPath: "/kbrMScIRyNPJOE6pj3QJo1MweQ1.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
