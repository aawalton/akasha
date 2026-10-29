import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e07 = {
  id: "01a18853-1b89-7f84-8799-ad8feb59565d",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e07",
  description:
    "After using a Borg conduit to travel through time faster, Dal and his friends find themselves at the mercy of a demanding Kazon.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 7,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230741",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/7",
    },
  ],
  title: "The Fast and the Curious",
  episodeType: "standard",
  stillPath: "/j3hPhzD8TfwCU2iKYwICDsAwjfq.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
