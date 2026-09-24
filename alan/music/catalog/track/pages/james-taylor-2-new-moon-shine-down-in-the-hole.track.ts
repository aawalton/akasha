import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineDownInTheHole = {
  id: "01a0abeb-3f5f-7706-adb6-4a795f8aa3ea",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-down-in-the-hole",
  ownLength: 5.252666666666666,
  ownProgress: 5.252666666666666,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Down In the Hole",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "downinthehole|0vn7UBvSQECKJm2817Yf1P|315160",
  song: "song/james-taylor-down-in-the-hole",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 2,
      externalId: "015PThyoU4QD0siLoLpRmr",
      externalLink: "https://open.spotify.com/track/015PThyoU4QD0siLoLpRmr",
    },
  ],
} as const satisfies Track
