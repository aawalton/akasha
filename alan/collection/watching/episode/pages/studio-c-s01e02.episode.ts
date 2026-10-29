import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e02 = {
  id: "01a18885-00f8-771c-b68f-6fcc4da35647",
  type: "page-type/episode",
  slug: "studio-c-s01e02",
  description:
    "Matt and Mallory lose their camera, Jason leads the group on a trek to Oregon, and Shoulder Angel advises against robbery.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-1"],
  position: 2,
  publishedAt: "2012-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378617",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/2",
    },
  ],
  title: "Season 1 Episode 2",
  episodeType: "standard",
  stillPath: "/gmxnFNvXbZua78liZCOAWWgqJaY.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
