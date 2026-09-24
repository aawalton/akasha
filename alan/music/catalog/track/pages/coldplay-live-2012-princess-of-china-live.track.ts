import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012PrincessOfChinaLive = {
  id: "01a0b9ee-da6f-741c-b526-d0625f5656c3",
  type: "page-type/track",
  slug: "coldplay-live-2012-princess-of-china-live",
  ownLength: 3.816,
  ownProgress: 3.816,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Princess of China - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "princessofchinalive|4gzpq5DPGxSnKTe4SA8HAU|228960",
  song: "song/coldplay-princess-of-china",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 7,
      externalId: "0t1nm5TmszvLLVAOLiOrH8",
      externalLink: "https://open.spotify.com/track/0t1nm5TmszvLLVAOLiOrH8",
    },
  ],
} as const satisfies Track
