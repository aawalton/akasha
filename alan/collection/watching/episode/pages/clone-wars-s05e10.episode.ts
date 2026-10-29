import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e10 = {
  id: "01a18844-6111-7e10-a06a-f64989dbce2e",
  type: "page-type/episode",
  slug: "clone-wars-s05e10",
  description:
    "R2-D2 is part of a team of Republic droids chosen for an important mission led by the diminutive Colonel Gascon to obtain an encryption module from a Separatist dreadnought. The droids must overcome numerous challenging obstacles to succeed in this crucial assignment.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 10,
  publishedAt: "2012-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010371",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/10",
    },
  ],
  title: "Secret Weapons",
  episodeType: "standard",
  stillPath: "/aEG52IJAOGCHvd5wWFAEQ2qyi3S.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
