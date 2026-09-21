import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiNightAtTheOpera2 = {
  id: "01a0c43e-71ce-7d00-8575-f73fe4ac97ab",
  type: "page-type/release",
  slug: "emei-night-at-the-opera-2",
  ownLength: 3.0798,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2026-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2XU7TKFSPdMo3dyNWLdvjO",
      externalLink: "https://open.spotify.com/album/2XU7TKFSPdMo3dyNWLdvjO",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Night at the Opera",
} as const satisfies Release
