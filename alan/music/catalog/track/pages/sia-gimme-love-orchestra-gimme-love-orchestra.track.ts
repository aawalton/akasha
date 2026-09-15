import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaGimmeLoveOrchestraGimmeLoveOrchestra = {
  id: "01a0a59b-f23f-7bfc-b27b-858c55b2e6cb",
  type: "page-type/track",
  slug: "sia-gimme-love-orchestra-gimme-love-orchestra",
  ownLength: 2.9942,
  ownProgress: 0,
  partOfCollections: ["release/sia-gimme-love-orchestra"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ZgEzvpqluac6YekgrcJ3b",
      externalLink: "https://open.spotify.com/track/5ZgEzvpqluac6YekgrcJ3b",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Gimme Love Orchestra",
} as const satisfies Track
