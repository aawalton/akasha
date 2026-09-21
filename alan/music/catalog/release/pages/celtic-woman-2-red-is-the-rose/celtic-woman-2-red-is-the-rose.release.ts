import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2RedIsTheRose = {
  id: "01a0676a-d727-705e-8fb6-d58f40b282f8",
  type: "page-type/release",
  slug: "celtic-woman-2-red-is-the-rose",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2025-05-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ORQwFm62ysiizXPqM1INp",
      externalLink: "https://open.spotify.com/album/6ORQwFm62ysiizXPqM1INp",
    },
  ],
  title: "Red is the Rose",
} as const satisfies Release
