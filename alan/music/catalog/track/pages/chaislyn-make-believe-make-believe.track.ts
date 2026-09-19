import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynMakeBelieveMakeBelieve = {
  id: "01a0b9ec-969d-7f94-993a-689afebb8902",
  type: "page-type/track",
  slug: "chaislyn-make-believe-make-believe",
  ownLength: 3.1366666666666667,
  ownProgress: 0,
  partOfCollections: ["release/chaislyn-make-believe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HAbEAz1TTAzdUcpDxuDDj",
      externalLink: "https://open.spotify.com/track/2HAbEAz1TTAzdUcpDxuDDj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Make Believe",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "makebelieve|3zmbniiciaBAJlSX1Bzq9R|188200",
  song: "song/chaislyn-make-believe",
} as const satisfies Track
