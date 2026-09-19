import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackRobynsTune = {
  id: "01a0b637-f875-7eab-8206-99964ba7242d",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-robyns-tune",
  ownLength: 1.732,
  ownProgress: 0,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YBQh7ZmFwQg78knLtfECb",
      externalLink: "https://open.spotify.com/track/4YBQh7ZmFwQg78knLtfECb",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Robyn's Tune",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6YtMPqKR0zhZ5OPv3RrJNx", artistName: "Kíla" }],
  trackKey: "robynstune|6YtMPqKR0zhZ5OPv3RrJNx|103920",
  song: "song/aurora-robyns-tune",
} as const satisfies Track
