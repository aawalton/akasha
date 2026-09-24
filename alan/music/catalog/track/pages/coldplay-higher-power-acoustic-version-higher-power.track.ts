import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHigherPowerAcousticVersionHigherPower = {
  id: "01a0b9ee-f00b-7090-a569-f0d53afd715b",
  type: "page-type/track",
  slug: "coldplay-higher-power-acoustic-version-higher-power",
  ownLength: 3.5215666666666667,
  ownProgress: 3.5215666666666667,
  partOfCollections: [
    "release/coldplay-higher-power-acoustic-version",
    "release/coldplay-higher-power-alyx-ander-remix",
    "release/coldplay-higher-power",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Higher Power",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|211294",
  song: "song/coldplay-higher-power",
  carriedBy: [
    {
      release: "release/coldplay-higher-power",
      discNumber: 1,
      position: 1,
      externalId: "0939D7aT18uBDS2MTjWzct",
      externalLink: "https://open.spotify.com/track/0939D7aT18uBDS2MTjWzct",
    },
    {
      release: "release/coldplay-higher-power-acoustic-version",
      discNumber: 1,
      position: 2,
      externalId: "77jJZBmiozygu5IYfPun2B",
      externalLink: "https://open.spotify.com/track/77jJZBmiozygu5IYfPun2B",
    },
    {
      release: "release/coldplay-higher-power-alyx-ander-remix",
      discNumber: 1,
      position: 2,
      externalId: "4tJJOIQVtzIG9i21VHu35z",
      externalLink: "https://open.spotify.com/track/4tJJOIQVtzIG9i21VHu35z",
    },
  ],
} as const satisfies Track
