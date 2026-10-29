import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWayHomeS04e01 = {
  id: "01a18858-c550-768e-9a77-75fe065c41a1",
  type: "page-type/episode",
  slug: "the-way-home-s04e01",
  description:
    "Alice is about to graduate high school; Kat and Elliot dream of the next steps for their relationship; Del realizes she will soon be an empty-nester again.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-way-home-season-4"],
  position: 1,
  publishedAt: "2026-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6614182",
      externalLink: "https://www.themoviedb.org/tv/201836/season/4/episode/1",
    },
  ],
  title: "Show Me the Way to Go Home",
  episodeType: "standard",
  stillPath: "/mIKpvNrITLue6jrodJyHz020GLQ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:01.487Z",
  updatedAt: "2026-10-29T15:48:01.487Z",
} as const satisfies Episode
