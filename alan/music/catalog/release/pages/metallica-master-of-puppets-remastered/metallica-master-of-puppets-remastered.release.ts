import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaMasterOfPuppetsRemastered = {
  id: "01a0676a-d724-703a-ba60-651feca4ab36",
  type: "page-type/release",
  slug: "metallica-master-of-puppets-remastered",
  title: "Master of Puppets (Remastered)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 54.7866,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1986-03-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5gzLOflH95LkKYE6XSXE9k",
      externalLink: "https://open.spotify.com/album/5gzLOflH95LkKYE6XSXE9k",
    },
  ],
} as const satisfies Release
