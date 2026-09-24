import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSpeedOfSound = {
  id: "01a0b9ee-e4c0-7eba-adda-091de301148e",
  type: "page-type/track",
  slug: "coldplay-x-y-speed-of-sound",
  ownLength: 4.7984333333333336,
  ownProgress: 4.7984333333333336,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Speed of Sound",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "speedofsound|4gzpq5DPGxSnKTe4SA8HAU|287906",
  song: "song/coldplay-speed-of-sound",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 7,
      externalId: "7clUVcSOtkNWa58Gw5RfD4",
      externalLink: "https://open.spotify.com/track/7clUVcSOtkNWa58Gw5RfD4",
    },
  ],
} as const satisfies Track
