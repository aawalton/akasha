import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e02 = {
  id: "01a18885-00fa-7e43-aeed-62f4eb920c15",
  type: "page-type/episode",
  slug: "studio-c-s04e02",
  description:
    "A helpful banana tries to teach Tommy the importance of eating right, Matt discovers his future career, and the Founding Fathers welcome James Madison to the group.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-4"],
  position: 2,
  publishedAt: "2014-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721782",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/2",
    },
  ],
  title: "Season 4 Episode 2",
  episodeType: "standard",
  stillPath: "/aapyf4aHFmOZxZBxub7zrfKdwnJ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
