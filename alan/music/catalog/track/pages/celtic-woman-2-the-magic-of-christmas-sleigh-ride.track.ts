import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasSleighRide = {
  id: "01a0abea-5778-7835-b54b-5ef4f8f71f5f",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-sleigh-ride",
  ownLength: 3.58,
  ownProgress: 3.58,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sleigh Ride",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "sleighride|6NWtt9pNOL2Gx7kBykdE5x|214800",
  song: "song/celtic-woman-sleigh-ride",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 8,
      externalId: "4ChnF0KzShZflpbVmMWD8P",
      externalLink: "https://open.spotify.com/track/4ChnF0KzShZflpbVmMWD8P",
    },
  ],
} as const satisfies Track
