import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e04 = {
  id: "01a18853-1b89-7ee7-97e3-eecea0a39b0a",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e04",
  description:
    "Although separated by decades, the Infinity and the Voyager crews band together to save Gwyn's life. A mysterious messenger reaches out to Gwyn.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 4,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230737",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/4",
    },
  ],
  title: "Temporal Mechanics 101",
  episodeType: "standard",
  stillPath: "/acnkLiyImfOfkFxcmZxaFmIG7sY.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
