import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2UhfWeirdAlYankovic = {
  id: "01a0676a-d72f-702d-b21b-f9f7d3d8ae14",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-uhf-weird-al-yankovic",
  title: 'UHF: "Weird Al" Yankovic',
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 42.538817,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1989-07-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65hW4JLei0jX9lTbzVMiBx",
      externalLink: "https://open.spotify.com/album/65hW4JLei0jX9lTbzVMiBx",
    },
  ],
} as const satisfies Release
