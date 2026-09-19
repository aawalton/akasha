import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageEarthquake = {
  id: "01a0afa2-731a-7126-a55f-4d9061a2ec68",
  type: "page-type/track",
  slug: "jisoo-amortage-earthquake",
  ownLength: 3.1801,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-amortage"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10zywlg5b0gQOC3q1A7ADx",
      externalLink: "https://open.spotify.com/track/10zywlg5b0gQOC3q1A7ADx",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "earthquake",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "earthquake|6UZ0ba50XreR4TM8u322gs|190806",
  song: "song/jisoo-earthquake",
} as const satisfies Track
