import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackWolfOrGirl = {
  id: "01a0b637-f6ca-7853-a379-a69872e0ed4a",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-wolf-or-girl",
  ownLength: 1.49,
  ownProgress: 0,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46L6iMEgSTGHM4QaLA5yQB",
      externalLink: "https://open.spotify.com/track/46L6iMEgSTGHM4QaLA5yQB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wolf or Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5kjb55jtwPnbYXXDvP4x7R", artistName: "Bruno Coulais" }],
  trackKey: "wolforgirl|5kjb55jtwPnbYXXDvP4x7R|89400",
  song: "song/aurora-wolf-or-girl",
} as const satisfies Track
