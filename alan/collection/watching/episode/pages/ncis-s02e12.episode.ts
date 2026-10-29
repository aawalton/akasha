import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e12 = {
  id: "01a1884b-ef64-7d65-b04a-166ae2f22ff6",
  type: "page-type/episode",
  slug: "ncis-s02e12",
  description:
    "The team take on another strange case when a telemarketer reports a possible murder of a Petty Officer who appeared to be dying over the phone.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 12,
  publishedAt: "2005-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334507",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/12",
    },
  ],
  title: "Doppelgänger",
  episodeType: "standard",
  stillPath: "/a0Z2fYv7gmflLmkZXyB2Epf8o1i.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
