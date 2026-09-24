import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesO = {
  id: "01a0b9ee-d950-7278-af03-d3b33418aa55",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-o",
  ownLength: 5.391333333333334,
  ownProgress: 5.391333333333334,
  partOfCollections: ["release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "O",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "o|4gzpq5DPGxSnKTe4SA8HAU|323480",
  song: "song/coldplay-o",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 9,
      externalId: "77yuzxCS3csrgTPSW0pvyk",
      externalLink: "https://open.spotify.com/track/77yuzxCS3csrgTPSW0pvyk",
    },
  ],
} as const satisfies Track
