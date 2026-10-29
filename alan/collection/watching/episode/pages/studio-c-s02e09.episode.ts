import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e09 = {
  id: "01a18885-00f9-759d-b3a4-1850ab198e6e",
  type: "page-type/episode",
  slug: "studio-c-s02e09",
  description:
    "A tango competition gets a little sticky, Jason Bourne faces a tough decision, and deathbed repentance is trickier than expected.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 9,
  publishedAt: "2013-05-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383576",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/9",
    },
  ],
  title: "Season 2 Episode 9",
  episodeType: "standard",
  stillPath: "/nCP86mb5oLsVhTzoVBOjC5ZJZF9.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
