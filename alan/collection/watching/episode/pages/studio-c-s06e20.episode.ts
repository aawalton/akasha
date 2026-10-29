import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS06e20 = {
  id: "01a18885-00fc-7f31-9004-243b6e06780e",
  type: "page-type/episode",
  slug: "studio-c-s06e20",
  description:
    "It's the Season 6 Season Finale. Matt impersonates a priest as Whitney comes to confessional, Juan returns to help another vacationer relax, and Adam goes to drastic measures to administer CPR.",
  ownLength: 19,
  ownProgress: 19,
  partOfCollections: ["season/studio-c-season-6"],
  position: 20,
  publishedAt: "2016-04-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855506",
      externalLink: "https://www.themoviedb.org/tv/68207/season/6/episode/20",
    },
  ],
  title: "Season 6 Episode 20",
  episodeType: "finale",
  stillPath: "/v7Acboc8mCIBnRcPh6flRTppn9F.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
