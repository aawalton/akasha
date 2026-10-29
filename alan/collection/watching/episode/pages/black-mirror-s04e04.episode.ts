import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS04e04 = {
  id: "01a18843-982b-70ce-83a4-fe560050f061",
  type: "page-type/episode",
  slug: "black-mirror-s04e04",
  description:
    "Paired up by a dating program that puts an expiration date on all relationships, Frank and Amy soon begin to question the system's logic.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-4"],
  position: 4,
  publishedAt: "2017-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402687",
      externalLink: "https://www.themoviedb.org/tv/42009/season/4/episode/4",
    },
  ],
  title: "Hang the DJ",
  episodeType: "standard",
  stillPath: "/zDnYPFIN5ssHrLDGoxEKwPJB3gm.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
