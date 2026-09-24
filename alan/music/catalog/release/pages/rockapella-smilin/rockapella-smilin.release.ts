import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaSmilin = {
  id: "01a0676a-d729-7032-8996-8a639fdacfb8",
  type: "page-type/release",
  slug: "rockapella-smilin",
  title: "Smilin'",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 39.921216666666666,
  ownProgress: 39.921217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-08-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bidRB2tHdPFVrgUAJF1sR",
      externalLink: "https://open.spotify.com/album/7bidRB2tHdPFVrgUAJF1sR",
    },
  ],
} as const satisfies Release
