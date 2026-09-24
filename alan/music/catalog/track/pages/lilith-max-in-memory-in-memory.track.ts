import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxInMemoryInMemory = {
  id: "01a0c95e-0265-77f1-a675-c2c857d36cfd",
  type: "page-type/track",
  slug: "lilith-max-in-memory-in-memory",
  ownLength: 3.24215,
  ownProgress: 3.24215,
  partOfCollections: ["release/lilith-max-in-memory"],
  status: "completed",
  unit: "unit/minutes",
  title: "In Memory",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lilith-max" }],
  trackKey: "inmemory|797SPxZf82IYq3XCM8c9AM|194529",
  song: "song/lilith-max-in-memory",
  carriedBy: [
    {
      release: "release/lilith-max-in-memory",
      discNumber: 1,
      position: 1,
      externalId: "1be8KVHs88c2hDXge6dsT1",
      externalLink: "https://open.spotify.com/track/1be8KVHs88c2hDXge6dsT1",
    },
  ],
} as const satisfies Track
