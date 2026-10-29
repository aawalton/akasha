import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e01 = {
  id: "01a18855-67e4-7f8e-a598-7c2fcd75b76e",
  type: "page-type/episode",
  slug: "steven-universe-s01e01",
  description:
    "Steven gets depressed when his favorite ice-cream sandwich brand, Cookie Cat, has been taken off the market. He soon cheers up when the Gems manage to get a hold of some of the last remaining Cookie Cats, which Steven believes may hold the key to activating his gem.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 1,
  publishedAt: "2013-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003578",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/1",
    },
  ],
  title: "Gem Glow",
  episodeType: "standard",
  stillPath: "/pPVLRbKMogQC53BZnsSXymKRP77.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
