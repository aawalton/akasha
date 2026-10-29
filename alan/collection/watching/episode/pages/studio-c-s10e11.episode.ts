import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS10e11 = {
  id: "01a18885-0100-7dd5-88d4-25403488ee46",
  type: "page-type/episode",
  slug: "studio-c-s10e11",
  description:
    "“The Bachelor” gets grilled by Mr. and Mrs. Claus. The Grinch experiences the side effects of a growing heart. And Rudolf the red-nosed reindeer gets sued for defamation.",
  ownLength: 53,
  ownProgress: 53,
  partOfCollections: ["season/studio-c-season-10"],
  position: 11,
  publishedAt: "2019-12-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2033025",
      externalLink: "https://www.themoviedb.org/tv/68207/season/10/episode/11",
    },
  ],
  title: "Season 10 Christmas Special",
  episodeType: "finale",
  stillPath: "/vIYuaMkcayxwmvu1Id5sPkAnwpG.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
