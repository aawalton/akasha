import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e09 = {
  id: "01a18885-00ff-7506-8393-dfa02472096a",
  type: "page-type/episode",
  slug: "studio-c-s09e09",
  description:
    "It's Christmas time for Studio C! Adam can't get his package open, Hannibal Lecter hosts a holiday party, and Santa teaches some YouTubers the true meaning of Christmas.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-9"],
  position: 9,
  publishedAt: "2018-12-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1639530",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/9",
    },
  ],
  title: "Season 9 Christmas Special",
  episodeType: "standard",
  stillPath: "/21bFF892MqraKvP2AHKdhktpZd5.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
