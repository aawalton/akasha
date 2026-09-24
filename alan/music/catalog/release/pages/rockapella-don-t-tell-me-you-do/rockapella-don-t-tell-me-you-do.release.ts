import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaDonTTellMeYouDo = {
  id: "01a0676a-d71c-7025-9542-822474e74b2b",
  type: "page-type/release",
  slug: "rockapella-don-t-tell-me-you-do",
  title: "Don't Tell Me You Do",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1998-03-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0VLJJkdpnVMuTLxnqwhuue",
      externalLink: "https://open.spotify.com/album/0VLJJkdpnVMuTLxnqwhuue",
    },
  ],
} as const satisfies Release
