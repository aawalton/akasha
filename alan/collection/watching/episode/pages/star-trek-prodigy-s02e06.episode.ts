import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e06 = {
  id: "01a18853-1b89-7ba7-962b-8e741cf1d816",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e06",
  description:
    "Hoping to hijack the Infinity before its scheduled destruction, Dal and the crew create hologram doubles to cover for their absence.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 6,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230739",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/6",
    },
  ],
  title: "Imposter Syndrome",
  episodeType: "standard",
  stillPath: "/14iubm45AXPso2tEB2t1Xcg16GG.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
