import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS08e01 = {
  id: "01a183d4-accb-7022-ac77-38226d4ce049",
  type: "page-type/episode",
  slug: "my-hero-academia-s08e01",
  description:
    "The fierce battle continues between Armored All Might and All For One. Can All Might possibly win?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-8"],
  position: 1,
  publishedAt: "2025-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6384467",
      externalLink: "https://www.themoviedb.org/tv/65930/season/8/episode/1",
    },
  ],
  title: "Toshinori Yagi: Rising/Origin",
  episodeType: "standard",
  stillPath: "/9Rp19trFIKOKtMorx84LnWkkajb.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
