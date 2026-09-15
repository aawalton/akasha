import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaTogetherTogether = {
  id: "01a0a59c-3038-7ee4-94f2-c92c2c17bfff",
  type: "track",
  slug: "sia-together-together",
  ownLength: 3.4201166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sia-together"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5id3Rqn7SPj1LX4FfY4nGz",
      externalLink: "https://open.spotify.com/track/5id3Rqn7SPj1LX4FfY4nGz",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Together",
} as const satisfies Track
