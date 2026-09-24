import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesMagic = {
  id: "01a0b9ee-d837-73b2-9f0d-eda329eca4a7",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-magic",
  ownLength: 4.750233333333333,
  ownProgress: 4.750233333333333,
  partOfCollections: ["release/coldplay-ghost-stories", "release/coldplay-magic"],
  status: "completed",
  unit: "unit/minutes",
  title: "Magic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "magic|4gzpq5DPGxSnKTe4SA8HAU|285014",
  song: "song/coldplay-magic",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 2,
      externalId: "23khhseCLQqVMCIT1WMAns",
      externalLink: "https://open.spotify.com/track/23khhseCLQqVMCIT1WMAns",
    },
    {
      release: "release/coldplay-magic",
      discNumber: 1,
      position: 1,
      externalId: "27jdUE1EYDSXZqhjuNxLem",
      externalLink: "https://open.spotify.com/track/27jdUE1EYDSXZqhjuNxLem",
    },
  ],
} as const satisfies Track
