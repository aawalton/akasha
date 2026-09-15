import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLivingOutLoudLivingOutLoud = {
  id: "01a0a59c-356e-7182-aeeb-f1fb2b146df0",
  type: "track",
  slug: "sia-living-out-loud-living-out-loud",
  ownLength: 3.9906,
  ownProgress: 0,
  partOfCollections: ["release/sia-living-out-loud"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SfcipP8VRPShcDC56tiYv",
      externalLink: "https://open.spotify.com/track/5SfcipP8VRPShcDC56tiYv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Living Out Loud",
} as const satisfies Track
