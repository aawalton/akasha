import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaPrincessOfChinaAcoustic = {
  id: "01a0b9ee-f8a6-73aa-9fc1-0785ac1f43b6",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-princess-of-china-acoustic",
  ownLength: 3.4448833333333333,
  ownProgress: 3.4448833333333333,
  partOfCollections: ["release/coldplay-princess-of-china"],
  status: "completed",
  unit: "unit/minutes",
  title: "Princess of China - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Rihanna" }],
  trackKey: "princessofchinaacoustic|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|206693",
  song: "song/coldplay-princess-of-china",
  carriedBy: [
    {
      release: "release/coldplay-princess-of-china",
      discNumber: 1,
      position: 4,
      externalId: "2tKqZsc0epdLrsNUT6y0Ls",
      externalLink: "https://open.spotify.com/track/2tKqZsc0epdLrsNUT6y0Ls",
    },
  ],
} as const satisfies Track
