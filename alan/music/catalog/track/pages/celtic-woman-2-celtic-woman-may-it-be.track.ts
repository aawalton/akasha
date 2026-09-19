import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanMayItBe = {
  id: "01a0abea-784d-7601-8a6b-c95d9b4377e2",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-may-it-be",
  ownLength: 3.7642166666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nagmlFCvUo7rSjt3wDPbD",
      externalLink: "https://open.spotify.com/track/6nagmlFCvUo7rSjt3wDPbD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "May It Be",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "mayitbe|6NWtt9pNOL2Gx7kBykdE5x|225853",
  song: "song/celtic-woman-may-it-be",
} as const satisfies Track
