import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e12 = {
  id: "01a18853-1b88-7a32-82d2-2ad9395b4172",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e12",
  description:
    "When the crew encounters a dormant Borg Cube, Zero risks everything to save their ship.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 12,
  publishedAt: "2022-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983092",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/12",
    },
  ],
  title: "Let Sleeping Borg Lie",
  episodeType: "standard",
  stillPath: "/zhy7LzHRMts3w8hufQ73mvTZD3Z.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
