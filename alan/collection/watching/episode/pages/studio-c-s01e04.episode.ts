import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e04 = {
  id: "01a18885-00f8-71bc-9e80-9dde800867e9",
  type: "page-type/episode",
  slug: "studio-c-s01e04",
  description:
    "The group debates if Dana really is dead, Matt explains the importance of going green, and Whitney directs Matt and Mallory on stage.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-1"],
  position: 4,
  publishedAt: "2012-10-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378619",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/4",
    },
  ],
  title: "Season 1 Episode 4",
  episodeType: "standard",
  stillPath: "/g50ARDUU65CrCmoeZqrjT7BQUTX.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
