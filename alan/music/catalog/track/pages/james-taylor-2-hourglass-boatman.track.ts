import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassBoatman = {
  id: "01a0abeb-3b4e-754a-91b7-a2355a377ce2",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-boatman",
  ownLength: 3.9433333333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4K5KFqVDdDInzT6NWklNMH",
      externalLink: "https://open.spotify.com/track/4K5KFqVDdDInzT6NWklNMH",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Boatman",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "boatman|0vn7UBvSQECKJm2817Yf1P|236600",
  song: "song/james-taylor-boatman",
} as const satisfies Track
