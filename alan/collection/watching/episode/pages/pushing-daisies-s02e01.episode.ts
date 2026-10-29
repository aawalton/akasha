import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pushingDaisiesS02e01 = {
  id: "01a1887f-251c-745f-bbef-0ccb5a0511ae",
  type: "page-type/episode",
  slug: "pushing-daisies-s02e01",
  description:
    "Emerson is hired by Dusty Fitz, whose wife Kentucky died in a tragic bee-related incident. She was involved with another man who Dusty claims she was preparing to leave, and Dusty suspects murder. Meanwhile, Lily helps Olive move to a nunnery.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/pushing-daisies-season-2"],
  position: 1,
  publishedAt: "2008-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364408",
      externalLink: "https://www.themoviedb.org/tv/5639/season/2/episode/1",
    },
  ],
  title: "Bzzzzzzzzz!",
  episodeType: "standard",
  stillPath: "/o6iVDEWMjt2ZzucpxWeSlgssJmg.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:29:56.379Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Episode
