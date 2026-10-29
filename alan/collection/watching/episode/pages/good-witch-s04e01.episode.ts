import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS04e01 = {
  id: "01a18849-3529-7da6-af00-b2168337741b",
  type: "page-type/episode",
  slug: "good-witch-s04e01",
  description:
    "Cassie gives those around her pieces of jewelry that magically turn out to be just the thing each needed. Abigail helps Sam search for the perfect engagement ring for Cassie -- a legendary Merriwick heirloom thought to be lost forever.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-4"],
  position: 1,
  publishedAt: "2018-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1422477",
      externalLink: "https://www.themoviedb.org/tv/61864/season/4/episode/1",
    },
  ],
  title: "With This Ring",
  episodeType: "standard",
  stillPath: "/wOLuNrPioJryp5LRmKpavZy2g3i.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
