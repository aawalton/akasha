import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3UnsungHero = {
  id: "01a0676a-d72f-7052-9284-073ca6e60e36",
  type: "page-type/release",
  slug: "the-piano-guys-3-unsung-hero",
  title: "Unsung Hero",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 8.8363,
  ownProgress: 8.8363,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-06-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6l0aWPFshYJEZBSrvpDc5b",
      externalLink: "https://open.spotify.com/album/6l0aWPFshYJEZBSrvpDc5b",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-15T16:39:47.000Z",
} as const satisfies Release
