import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e13 = {
  id: "01a18853-ac8b-7af7-908e-da87eecb8e5d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e13",
  description:
    "Stardate: Unknown. After finding and repairing a robot found drifting in space, B'Elanna is abducted and forced to design a new prototype or Voyager will be destroyed.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 13,
  publishedAt: "1996-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112997",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/13",
    },
  ],
  title: "Prototype",
  episodeType: "standard",
  stillPath: "/tfASwkkY4KzWV5fOZVJRDBUaWyk.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
