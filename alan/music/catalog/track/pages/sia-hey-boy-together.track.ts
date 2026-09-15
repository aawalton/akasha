import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaHeyBoyTogether = {
  id: "01a0a59c-2d77-7529-90f6-11cdabfaf097",
  type: "page-type/track",
  slug: "sia-hey-boy-together",
  ownLength: 3.4201166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sia-hey-boy"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HWmQkGCx1lZZVGdScigGm",
      externalLink: "https://open.spotify.com/track/3HWmQkGCx1lZZVGdScigGm",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Together",
} as const satisfies Track
