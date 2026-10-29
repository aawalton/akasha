import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e18 = {
  id: "01a18853-1b89-73db-808f-976175c42d45",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e18",
  description:
    "Desperate to warn Starfleet of their dilemma, a daring experiment goes awry as Dal inadvertently swaps minds with a Starfleet Vice Admiral.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 18,
  publishedAt: "2022-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983098",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/18",
    },
  ],
  title: "Mindwalk",
  episodeType: "standard",
  stillPath: "/5ymyryUQ7pMC82BtupqFzyWXoVg.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
