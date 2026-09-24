import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYouFixYou = {
  id: "01a0b9ee-feb9-709e-8750-0eda609bf014",
  type: "page-type/track",
  slug: "coldplay-fix-you-fix-you",
  ownLength: 4.92555,
  ownProgress: 4.92555,
  partOfCollections: ["release/coldplay-fix-you", "release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fix You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "fixyou|4gzpq5DPGxSnKTe4SA8HAU|295533",
  song: "song/coldplay-fix-you",
  carriedBy: [
    {
      release: "release/coldplay-fix-you",
      discNumber: 1,
      position: 1,
      externalId: "1SWPQul8Zr5jezPUYPcLwR",
      externalLink: "https://open.spotify.com/track/1SWPQul8Zr5jezPUYPcLwR",
    },
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 4,
      externalId: "7LVHVU3tWfcxj5aiPFEW4Q",
      externalLink: "https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q",
    },
  ],
} as const satisfies Track
