import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S04e08 = {
  id: "01a18843-5082-73ba-bbb7-5bd0a869c6c8",
  type: "page-type/episode",
  slug: "babylon-5-s04e08",
  description:
    "A team of ISN reporters arrives at the station wanting to do a story about Babylon 5. Sheridan refuses at first, but finally agrees on the theory that at least a small part of their side of the conflict will be shown.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-no-surrender-no-retreat"],
  position: 8,
  publishedAt: "1997-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235884",
      externalLink: "https://www.themoviedb.org/tv/3137/season/4/episode/8",
    },
  ],
  title: "The Illusion of Truth",
  episodeType: "standard",
  stillPath: "/hV1SotB4uUaZ95LznAZERWbbQKH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
