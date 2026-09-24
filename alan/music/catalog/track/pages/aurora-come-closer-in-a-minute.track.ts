import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserInAMinute = {
  id: "01a0b637-e8c5-70d9-a180-0034c5f0ac4a",
  type: "page-type/track",
  slug: "aurora-come-closer-in-a-minute",
  grade: "C",
  ownLength: 5.23755,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  status: "not-started",
  unit: "unit/minutes",
  title: "IN A MINUTE",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "TOMORA" },
    { artist: "artist/aurora" },
    { artistName: "Tom Rowlands" },
  ],
  trackKey: "inaminute|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|314253",
  song: "song/aurora-in-a-minute",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 12,
      externalId: "3v37hY20GcvOr9NnldJIIO",
      externalLink: "https://open.spotify.com/track/3v37hY20GcvOr9NnldJIIO",
    },
  ],
} as const satisfies Track
