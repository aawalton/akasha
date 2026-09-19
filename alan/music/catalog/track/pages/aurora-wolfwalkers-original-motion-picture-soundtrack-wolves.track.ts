import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackWolves = {
  id: "01a0b637-f655-7a08-8302-cf0d90766ca2",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-wolves",
  ownLength: 4.332216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AVWBd5yWv9tKRRtqg5l4k",
      externalLink: "https://open.spotify.com/track/5AVWBd5yWv9tKRRtqg5l4k",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wolves",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5kjb55jtwPnbYXXDvP4x7R", artistName: "Bruno Coulais" }],
  trackKey: "wolves|5kjb55jtwPnbYXXDvP4x7R|259933",
  song: "song/aurora-wolves",
} as const satisfies Track
