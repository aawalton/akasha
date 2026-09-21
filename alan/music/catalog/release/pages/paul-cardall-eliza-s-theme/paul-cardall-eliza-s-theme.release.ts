import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallElizaSTheme = {
  id: "01a0676a-d71c-7064-9468-ae248ae79548",
  type: "page-type/release",
  slug: "paul-cardall-eliza-s-theme",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-08-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ys2GeBD9F8i0b5bDnh8yL",
      externalLink: "https://open.spotify.com/album/1Ys2GeBD9F8i0b5bDnh8yL",
    },
  ],
  title: "Eliza's Theme",
} as const satisfies Release
