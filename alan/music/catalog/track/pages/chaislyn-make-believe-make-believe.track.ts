import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynMakeBelieveMakeBelieve = {
  id: "01a0b9ec-969d-7f94-993a-689afebb8902",
  type: "page-type/track",
  slug: "chaislyn-make-believe-make-believe",
  ownLength: 3.1366666666666667,
  ownProgress: 3.1366666666666667,
  partOfCollections: ["release/chaislyn-make-believe", "release/chaislyn-unreliable-narrator"],
  status: "completed",
  unit: "unit/minutes",
  title: "Make Believe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/chaislyn" }],
  trackKey: "makebelieve|3zmbniiciaBAJlSX1Bzq9R|188200",
  song: "song/chaislyn-make-believe",
  carriedBy: [
    {
      release: "release/chaislyn-make-believe",
      discNumber: 1,
      position: 1,
      externalId: "2HAbEAz1TTAzdUcpDxuDDj",
      externalLink: "https://open.spotify.com/track/2HAbEAz1TTAzdUcpDxuDDj",
    },
    {
      release: "release/chaislyn-unreliable-narrator",
      discNumber: 1,
      position: 1,
      externalId: "6lmTap581KiGYXVyPZFvkS",
      externalLink: "https://open.spotify.com/track/6lmTap581KiGYXVyPZFvkS",
    },
  ],
} as const satisfies Track
