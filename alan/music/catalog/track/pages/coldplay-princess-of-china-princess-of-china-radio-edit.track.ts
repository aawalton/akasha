import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaPrincessOfChinaRadioEdit = {
  id: "01a0b9ee-f81b-7f83-bfae-da4dfd92c987",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-princess-of-china-radio-edit",
  ownLength: 3.62625,
  ownProgress: 3.62625,
  partOfCollections: [
    "release/coldplay-princess-of-china",
    "release/coldplay-princess-of-china-radio-edit",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Princess of China - Radio Edit",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Rihanna" }],
  trackKey: "princessofchinaradioedit|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|217575",
  song: "song/coldplay-princess-of-china",
  carriedBy: [
    {
      release: "release/coldplay-princess-of-china",
      discNumber: 1,
      position: 1,
      externalId: "6XJ2PVp2Vs9G2j5B2Cbbnb",
      externalLink: "https://open.spotify.com/track/6XJ2PVp2Vs9G2j5B2Cbbnb",
    },
    {
      release: "release/coldplay-princess-of-china-radio-edit",
      discNumber: 1,
      position: 1,
      externalId: "19TPvVmCUHn71omJ16N9hK",
      externalLink: "https://open.spotify.com/track/19TPvVmCUHn71omJ16N9hK",
    },
  ],
} as const satisfies Track
