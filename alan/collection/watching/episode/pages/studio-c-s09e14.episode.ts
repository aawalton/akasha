import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e14 = {
  id: "01a18885-00ff-7b0e-81cb-05a255866f7e",
  type: "page-type/episode",
  slug: "studio-c-s09e14",
  description:
    "Susan Weebers prepares for a romantic evening, and a dating show features an unusual contestant.",
  ownLength: 28,
  ownProgress: 28,
  partOfCollections: ["season/studio-c-season-9"],
  position: 14,
  publishedAt: "2019-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1711716",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/14",
    },
  ],
  title: "Season 9 Valentine's Special",
  episodeType: "standard",
  stillPath: "/9jNSdHi8IgDhjRzhsP9bjieiVvw.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
