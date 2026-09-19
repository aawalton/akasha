import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackFollowMe = {
  id: "01a0b637-f82e-79d0-a052-a091f96ce282",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-follow-me",
  ownLength: 3.465333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GPz8DVfg6oTTCjewoSW4y",
      externalLink: "https://open.spotify.com/track/1GPz8DVfg6oTTCjewoSW4y",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Follow Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5kjb55jtwPnbYXXDvP4x7R", artistName: "Bruno Coulais" }],
  trackKey: "followme|5kjb55jtwPnbYXXDvP4x7R|207920",
  song: "song/aurora-follow-me",
} as const satisfies Track
