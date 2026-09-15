import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDanceAloneRemixes = {
  id: "01a0676a-d71b-7053-8fa6-7eef3a8c1fed",
  type: "release",
  slug: "sia-dance-alone-remixes",
  title: "Dance Alone Remixes",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 28.103917,
  ownProgress: 28.103917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-03-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kNrYbOMDXsYfiExWS4C0T",
      externalLink: "https://open.spotify.com/album/0kNrYbOMDXsYfiExWS4C0T",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
