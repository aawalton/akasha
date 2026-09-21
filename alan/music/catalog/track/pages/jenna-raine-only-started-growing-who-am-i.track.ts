import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineOnlyStartedGrowingWhoAmI = {
  id: "01a0c621-1b10-7748-abfb-5ba5f428c0e4",
  type: "page-type/track",
  slug: "jenna-raine-only-started-growing-who-am-i",
  ownLength: 2.6633333333333336,
  ownProgress: 2.6633333333333336,
  partOfCollections: ["release/jenna-raine-only-started-growing"],
  status: "completed",
  unit: "unit/minutes",
  title: "Who Am I",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "whoami|3aHe9rMa5HFTjXHw8tEz0A|159800",
  song: "song/jenna-raine-who-am-i",
  carriedBy: [
    {
      release: "release/jenna-raine-only-started-growing",
      discNumber: 1,
      position: 4,
      externalId: "0AB5YzmICCzimyMfLWfrUA",
      externalLink: "https://open.spotify.com/track/0AB5YzmICCzimyMfLWfrUA",
    },
  ],
} as const satisfies Track
