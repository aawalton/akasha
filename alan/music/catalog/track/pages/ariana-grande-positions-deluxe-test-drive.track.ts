import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeTestDrive = {
  id: "01a0a6c5-209e-73ce-9693-cae35568bfd6",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-test-drive",
  ownLength: 2.036233333333333,
  ownProgress: 2.036233333333333,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "test drive",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "testdrive|66CXWjxzNUsdJxJ2JdwvnR|122174",
  song: "song/ariana-grande-test-drive",
  carriedBy: [
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "3eZYOQO4UzKrUDYDghtnFw",
      externalLink: "https://open.spotify.com/track/3eZYOQO4UzKrUDYDghtnFw",
    },
  ],
} as const satisfies Track
