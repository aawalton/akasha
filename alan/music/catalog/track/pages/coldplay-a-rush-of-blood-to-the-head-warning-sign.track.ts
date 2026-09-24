import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadWarningSign = {
  id: "01a0b9ee-e889-7099-ba3d-68637a4c147c",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-warning-sign",
  ownLength: 5.518883333333333,
  ownProgress: 5.518883333333333,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "Warning Sign",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "warningsign|4gzpq5DPGxSnKTe4SA8HAU|331133",
  song: "song/coldplay-warning-sign",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 8,
      externalId: "4bPkBHKLKd9WHizsvM2zV3",
      externalLink: "https://open.spotify.com/track/4bPkBHKLKd9WHizsvM2zV3",
    },
  ],
} as const satisfies Track
