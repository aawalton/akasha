import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeOldFriends = {
  id: "01a0b9ee-d0b0-7c5d-9bd6-f9fca0bf022e",
  type: "page-type/track",
  slug: "coldplay-everyday-life-old-friends",
  ownLength: 2.4491,
  ownProgress: 2.4491,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Old Friends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oldfriends|4gzpq5DPGxSnKTe4SA8HAU|146946",
  song: "song/coldplay-old-friends",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 5,
      externalId: "3E3zYgQul8EaJioNvD2tv9",
      externalLink: "https://open.spotify.com/track/3E3zYgQul8EaJioNvD2tv9",
    },
  ],
} as const satisfies Track
