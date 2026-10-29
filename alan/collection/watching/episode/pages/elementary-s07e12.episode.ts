import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS07e12 = {
  id: "01a1887e-62af-7234-a01b-8c79738427ae",
  type: "page-type/episode",
  slug: "elementary-s07e12",
  description:
    "Tech billionaire Odin Reichenbach inadvertently provides Holmes and Watson with a lead that could give them evidence that brings him to justice.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-7"],
  position: 12,
  publishedAt: "2019-08-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1864384",
      externalLink: "https://www.themoviedb.org/tv/1415/season/7/episode/12",
    },
  ],
  title: "Reichenbach Falls",
  episodeType: "standard",
  stillPath: "/XcK6kboIqBc3aCTLpi2On93xan.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
