import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e13 = {
  id: "01a18853-1b88-734c-a202-5b487640b79d",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e13",
  description: "The crew answers a distress call to find a colony trapped in Starfleet's past.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 13,
  publishedAt: "2022-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983093",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/13",
    },
  ],
  title: "All the World's a Stage",
  episodeType: "standard",
  stillPath: "/qHngIISihWFyeUvfdRRI6tvYksH.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
