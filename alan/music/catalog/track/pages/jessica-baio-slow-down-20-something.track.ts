import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSlowDown20Something = {
  id: "01a0c622-1e78-70a2-a54e-53630eac3997",
  type: "page-type/track",
  slug: "jessica-baio-slow-down-20-something",
  ownLength: 2.6797,
  ownProgress: 2.6797,
  partOfCollections: ["release/jessica-baio-slow-down", "release/jessica-baio-20-something"],
  status: "completed",
  unit: "unit/minutes",
  title: "20 something",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "20something|0VMFTqmv0hYlWruyBERT95|160782",
  song: "song/jessica-baio-20-something",
  carriedBy: [
    {
      release: "release/jessica-baio-20-something",
      discNumber: 1,
      position: 1,
      externalId: "3xpuHGQZMXiR8j9aCIOO8C",
      externalLink: "https://open.spotify.com/track/3xpuHGQZMXiR8j9aCIOO8C",
    },
    {
      release: "release/jessica-baio-slow-down",
      discNumber: 1,
      position: 2,
      externalId: "2E3LnUh82GoLgrOhgBpJNf",
      externalLink: "https://open.spotify.com/track/2E3LnUh82GoLgrOhgBpJNf",
    },
  ],
} as const satisfies Track
