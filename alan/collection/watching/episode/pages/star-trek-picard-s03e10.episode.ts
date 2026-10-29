import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e10 = {
  id: "01a18853-07cf-7b52-9050-176ba4725f0e",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e10",
  description:
    "In a desperate last stand, Jean-Luc Picard and generations of crews both old and new fight together to save the galaxy from the greatest threat they’ve ever faced.",
  ownLength: 63,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 10,
  publishedAt: "2023-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218559",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/10",
    },
  ],
  title: "The Last Generation",
  episodeType: "finale",
  stillPath: "/47WcAv4SUpUrgvI2hQ92p8ZJbXK.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
