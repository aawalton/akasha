import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e10 = {
  id: "01a18852-a9f7-7fcf-a743-eb1a627e3e7c",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e10",
  description:
    "Captain Burnham and her crew must go where few have gone before: beyond the Galactic Barrier. Meanwhile, Book learns the truth of what drives Ruon Tarka.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 10,
  publishedAt: "2022-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3497477",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/10",
    },
  ],
  title: "The Galactic Barrier",
  episodeType: "standard",
  stillPath: "/r5OYdsKMaLH0p4Z1te1bKD5VXGK.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
