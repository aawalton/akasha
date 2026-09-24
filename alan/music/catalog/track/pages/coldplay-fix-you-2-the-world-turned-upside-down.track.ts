import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYou2TheWorldTurnedUpsideDown = {
  id: "01a0b9ee-ff82-7246-9735-5817c49ec6e2",
  type: "page-type/track",
  slug: "coldplay-fix-you-2-the-world-turned-upside-down",
  ownLength: 4.5437666666666665,
  ownProgress: 4.5437666666666665,
  partOfCollections: ["release/coldplay-fix-you-2", "release/coldplay-fix-you"],
  status: "completed",
  unit: "unit/minutes",
  title: "The World Turned Upside Down",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "theworldturnedupsidedown|4gzpq5DPGxSnKTe4SA8HAU|272626",
  song: "song/coldplay-the-world-turned-upside-down",
  carriedBy: [
    {
      release: "release/coldplay-fix-you",
      discNumber: 1,
      position: 3,
      externalId: "1AvVRqeSLzsZJozkyaB9cu",
      externalLink: "https://open.spotify.com/track/1AvVRqeSLzsZJozkyaB9cu",
    },
    {
      release: "release/coldplay-fix-you-2",
      discNumber: 1,
      position: 2,
      externalId: "29RjYJw9AahhQJaZgdPy2E",
      externalLink: "https://open.spotify.com/track/29RjYJw9AahhQJaZgdPy2E",
    },
  ],
} as const satisfies Track
