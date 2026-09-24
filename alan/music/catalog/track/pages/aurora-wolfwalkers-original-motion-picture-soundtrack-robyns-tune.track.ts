import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackRobynsTune = {
  id: "01a0b637-f875-7eab-8206-99964ba7242d",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-robyns-tune",
  ownLength: 1.732,
  ownProgress: 1.732,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  status: "completed",
  unit: "unit/minutes",
  title: "Robyn's Tune",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Kíla" }],
  trackKey: "robynstune|6YtMPqKR0zhZ5OPv3RrJNx|103920",
  song: "song/aurora-robyns-tune",
  carriedBy: [
    {
      release: "release/aurora-wolfwalkers-original-motion-picture-soundtrack",
      discNumber: 1,
      position: 16,
      externalId: "4YBQh7ZmFwQg78knLtfECb",
      externalLink: "https://open.spotify.com/track/4YBQh7ZmFwQg78knLtfECb",
    },
  ],
} as const satisfies Track
