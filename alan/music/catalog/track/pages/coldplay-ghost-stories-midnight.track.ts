import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesMidnight = {
  id: "01a0b9ee-d8b2-7af4-9f4b-4675a8b2b3d8",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-midnight",
  ownLength: 4.9111,
  ownProgress: 4.9111,
  partOfCollections: ["release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "midnight|4gzpq5DPGxSnKTe4SA8HAU|294666",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 5,
      externalId: "4GKk1uNzpxIptBuaY97Dkj",
      externalLink: "https://open.spotify.com/track/4GKk1uNzpxIptBuaY97Dkj",
    },
  ],
} as const satisfies Track
