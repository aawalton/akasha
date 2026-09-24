import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSwallowedInTheSea = {
  id: "01a0b9ee-e555-751d-bcf9-c3bc253571ef",
  type: "page-type/track",
  slug: "coldplay-x-y-swallowed-in-the-sea",
  ownLength: 3.98335,
  ownProgress: 3.98335,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Swallowed in the Sea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "swallowedinthesea|4gzpq5DPGxSnKTe4SA8HAU|239001",
  song: "song/coldplay-swallowed-in-the-sea",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 11,
      externalId: "2u2WL5N3KnQnykOZi3fxL6",
      externalLink: "https://open.spotify.com/track/2u2WL5N3KnQnykOZi3fxL6",
    },
  ],
} as const satisfies Track
