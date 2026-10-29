import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e10 = {
  id: "01a18885-00f9-7ebe-b1c8-88ea01ad003d",
  type: "page-type/episode",
  slug: "studio-c-s02e10",
  description:
    "The students at the flirting academy finally graduate, the radio mystery hour comes crashing down, and Regis helps the latest Millionaire contestant.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 10,
  publishedAt: "2013-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383577",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/10",
    },
  ],
  title: "Season 2 Episode 10",
  episodeType: "standard",
  stillPath: "/l2H61btASfKECcf8OMXkHiuISGQ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
