import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineShakeItOutShakeItOut = {
  id: "01a0a5cd-8117-77a3-90aa-a7d137465f5e",
  type: "page-type/track",
  slug: "florence-the-machine-shake-it-out-shake-it-out",
  ownLength: 4.646283333333334,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-shake-it-out"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1lMMFteev4B3SEgHYisc2S",
      externalLink: "https://open.spotify.com/track/1lMMFteev4B3SEgHYisc2S",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Shake It Out",
} as const satisfies Track
