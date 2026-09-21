import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiNightAtTheOpera = {
  id: "01a0c43e-6fb1-7af3-b04c-1aedbe7d162a",
  type: "page-type/release",
  slug: "emei-night-at-the-opera",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2026-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30XL7bANBr0cBA9nVCq8CN",
      externalLink: "https://open.spotify.com/album/30XL7bANBr0cBA9nVCq8CN",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Night at the Opera",
} as const satisfies Release
