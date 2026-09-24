import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesHighSpeed = {
  id: "01a0b9ee-ea3b-7d5b-a1e8-27117dd4b5ff",
  type: "page-type/track",
  slug: "coldplay-parachutes-high-speed",
  ownLength: 4.2744333333333335,
  ownProgress: 4.2744333333333335,
  partOfCollections: ["release/coldplay-parachutes", "release/coldplay-the-blue-room"],
  status: "completed",
  unit: "unit/minutes",
  title: "High Speed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "highspeed|4gzpq5DPGxSnKTe4SA8HAU|256466",
  song: "song/coldplay-high-speed",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 8,
      externalId: "2DHgvPQD1jApRnT1DBZdrS",
      externalLink: "https://open.spotify.com/track/2DHgvPQD1jApRnT1DBZdrS",
    },
    {
      release: "release/coldplay-the-blue-room",
      discNumber: 1,
      position: 4,
      externalId: "2nhjxNFCXbnYBpCbrmT1Ol",
      externalLink: "https://open.spotify.com/track/2nhjxNFCXbnYBpCbrmT1Ol",
    },
  ],
} as const satisfies Track
