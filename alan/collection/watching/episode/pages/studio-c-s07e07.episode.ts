import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS07e07 = {
  id: "01a18885-00fd-79a8-bdda-5608dbf1a221",
  type: "page-type/episode",
  slug: "studio-c-s07e07",
  description:
    "Harry Potter and the gang try using the Mirror of Erised again, Natalie adopts a strange new cat, and Jeremy struggles with getting picked last for the team.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-7"],
  position: 7,
  publishedAt: "2016-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855470",
      externalLink: "https://www.themoviedb.org/tv/68207/season/7/episode/7",
    },
  ],
  title: "Season 7 Episode 7",
  episodeType: "standard",
  stillPath: "/is2kCk7XnAbt6ORFtpgF1Ep51bg.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
