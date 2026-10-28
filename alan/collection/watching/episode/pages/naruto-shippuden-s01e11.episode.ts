import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e11 = {
  id: "01a183d2-3bd4-762b-90d0-8de6b732c3c4",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e11",
  description:
    "Sakura treats a critically ill Kankuro. After extensive training she’s now a full-fledged Medic Ninja, and Sakura amazes everyone with her sure, steady hands.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 11,
  publishedAt: "2007-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761481",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/11",
    },
  ],
  title: "The Medical Ninja's Student",
  episodeType: "standard",
  stillPath: "/juL5lB6hKrWFUwjmoRZpzNOFIVK.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
