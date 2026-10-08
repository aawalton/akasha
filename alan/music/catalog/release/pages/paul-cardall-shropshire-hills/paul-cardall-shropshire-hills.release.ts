import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallShropshireHills = {
  id: "01a0676a-d728-707d-bb73-acdad60eba5f",
  type: "page-type/release",
  slug: "paul-cardall-shropshire-hills",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-07-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15ufELGSNAoBQBAtpSfO6B",
      externalLink: "https://open.spotify.com/album/15ufELGSNAoBQBAtpSfO6B",
    },
  ],
  title: "Shropshire Hills",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
