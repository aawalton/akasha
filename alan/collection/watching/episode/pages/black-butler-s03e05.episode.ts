import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS03e05 = {
  id: "01a183d8-99a7-73db-8b05-2e4150c0592c",
  type: "page-type/episode",
  slug: "black-butler-s03e05",
  description:
    "Sebastian and Will may well be the most awkward duo in circus history, but Ciel currently has bigger problems.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-3"],
  position: 5,
  publishedAt: "2014-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997390",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3/episode/5",
    },
  ],
  title: "His Butler, Taking Flight",
  episodeType: "standard",
  stillPath: "/coEwQZVE4AwGn9DscJLWOAJVcJq.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
