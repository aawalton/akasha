import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaFlamesFlames = {
  id: "01a0a59c-3469-782e-af59-9e1559480576",
  type: "track",
  slug: "sia-flames-flames",
  ownLength: 3.25,
  ownProgress: 0,
  partOfCollections: ["release/sia-flames"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33IOhptvC2Qoy2UhjiHXLV",
      externalLink: "https://open.spotify.com/track/33IOhptvC2Qoy2UhjiHXLV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Flames",
} as const satisfies Track
