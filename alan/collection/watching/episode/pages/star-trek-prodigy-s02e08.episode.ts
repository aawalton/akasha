import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e08 = {
  id: "01a18853-1b89-7b36-8cb0-94fe25f7ea2e",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e08",
  description:
    "The crew detours to a colony of non-corporeal entities, who offer Zero an opportunity to obtain a physical body. Janeway discovers Dal's real intentions.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 8,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230742",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/8",
    },
  ],
  title: "Is There in Beauty No Truth?",
  episodeType: "standard",
  stillPath: "/gHDc4BZtRl0kAkP7Ydse2ChVE35.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
