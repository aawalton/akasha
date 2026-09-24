import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWolfwalkersOriginalMotionPictureSoundtrackFollowMe = {
  id: "01a0b637-f82e-79d0-a052-a091f96ce282",
  type: "page-type/track",
  slug: "aurora-wolfwalkers-original-motion-picture-soundtrack-follow-me",
  ownLength: 3.465333333333333,
  ownProgress: 3.465333333333333,
  partOfCollections: ["release/aurora-wolfwalkers-original-motion-picture-soundtrack"],
  status: "completed",
  unit: "unit/minutes",
  title: "Follow Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Bruno Coulais" }],
  trackKey: "followme|5kjb55jtwPnbYXXDvP4x7R|207920",
  song: "song/aurora-follow-me",
  carriedBy: [
    {
      release: "release/aurora-wolfwalkers-original-motion-picture-soundtrack",
      discNumber: 1,
      position: 14,
      externalId: "1GPz8DVfg6oTTCjewoSW4y",
      externalLink: "https://open.spotify.com/track/1GPz8DVfg6oTTCjewoSW4y",
    },
  ],
} as const satisfies Track
