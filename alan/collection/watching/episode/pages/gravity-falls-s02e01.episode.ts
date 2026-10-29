import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e01 = {
  id: "01a18849-545e-7728-904a-f6e5f1c62f97",
  type: "page-type/episode",
  slug: "gravity-falls-s02e01",
  description:
    "The Pines family is starting to get everything back to normal after the Lil' Gideon incident. They throw a “Mystery Shack Is Back” party, but some unwelcome guests intend to crash it.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 1,
  publishedAt: "2014-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000464",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/1",
    },
  ],
  title: "Scary-oke",
  episodeType: "standard",
  stillPath: "/p6DUpMpPgKH5TsPVWRii7IEj1Wq.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
