import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e11 = {
  id: "01a18853-1b89-75b5-a7b2-fb6daee365be",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e11",
  description:
    "Thanks to Wesley Crusher's timely intervention, the cadets find the Protostar — but the ship's marooned guardian isn't eager for their assistance.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 11,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230745",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/11",
    },
  ],
  title: "Last Flight of the Protostar (1)",
  episodeType: "standard",
  stillPath: "/e40KTVfUKPE9by1ooAqwCRCabJg.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
