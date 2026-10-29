import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e06 = {
  id: "01a18885-00f8-7108-b82a-a267b2ce9d0a",
  type: "page-type/episode",
  slug: "studio-c-s01e06",
  description:
    "Matt loses a little blood with Mallory and Jason, Spencer meets his new roommate, and the group meets some new classmates.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-1"],
  position: 6,
  publishedAt: "2012-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378621",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/6",
    },
  ],
  title: "Season 1 Episode 6",
  episodeType: "standard",
  stillPath: "/5ZF3cnBNUNVSebh1mU1as3tj4Tp.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
