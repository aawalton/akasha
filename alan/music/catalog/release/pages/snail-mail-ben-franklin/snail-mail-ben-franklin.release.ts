import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const snailMailBenFranklin = {
  id: "01a0676a-d718-7040-a825-3ec7fbcbb099",
  type: "page-type/release",
  slug: "snail-mail-ben-franklin",
  title: "Ben Franklin",
  partOfCollections: ["artist/snail-mail"],
  position: 0,
  ownLength: 6.298883,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VfCI8EO1rfuGF0VmcM57O",
      externalLink: "https://open.spotify.com/album/2VfCI8EO1rfuGF0VmcM57O",
    },
  ],
} as const satisfies Release
