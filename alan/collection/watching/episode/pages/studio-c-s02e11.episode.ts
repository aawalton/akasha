import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e11 = {
  id: "01a18885-00f9-709c-abb3-063b75d71e97",
  type: "page-type/episode",
  slug: "studio-c-s02e11",
  description:
    "Roger's wobbly wheelbarrow is stolen, finding the drop is harder than it appears, and the characters of Candyland are in a financial crisis.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 11,
  publishedAt: "2013-06-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383578",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/11",
    },
  ],
  title: "Season 2 Episode 11",
  episodeType: "standard",
  stillPath: "/sSDq0h48iotzbPjYngMX3FO9U1E.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
