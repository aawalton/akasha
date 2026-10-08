import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaMothIntoFlameLive = {
  id: "01a0676a-d725-7008-bcaa-fa9b1c83a2b5",
  type: "page-type/release",
  slug: "metallica-moth-into-flame-live",
  title: "Moth Into Flame (Live)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 28.4553,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-08-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Od43KqRw3TLAusoGZpXMx",
      externalLink: "https://open.spotify.com/album/5Od43KqRw3TLAusoGZpXMx",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
