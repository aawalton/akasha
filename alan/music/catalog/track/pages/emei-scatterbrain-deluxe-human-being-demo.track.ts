import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeHumanBeingDemo = {
  id: "01a0c43e-7500-74c8-8859-434f732ddd55",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-human-being-demo",
  ownLength: 1.9983333333333333,
  ownProgress: 1.9983333333333333,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "304dMIr0dsQ9JUliawZVKT",
      externalLink: "https://open.spotify.com/track/304dMIr0dsQ9JUliawZVKT",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Human Being - Demo",
  trackType: "demo",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "humanbeingdemo|7E2aQQjErJocovYFjYLzWU|119900",
  song: "song/emei-human-being",
} as const satisfies Track
