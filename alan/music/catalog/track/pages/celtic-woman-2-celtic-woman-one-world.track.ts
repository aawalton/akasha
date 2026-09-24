import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanOneWorld = {
  id: "01a0abea-78a7-740d-ac59-b056cdcb35a2",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-one-world",
  ownLength: 3.7997666666666667,
  ownProgress: 3.7997666666666667,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "One World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "oneworld|6NWtt9pNOL2Gx7kBykdE5x|227986",
  song: "song/celtic-woman-one-world",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 5,
      externalId: "5X6TRZfx9AE3Bd0M1FZkr8",
      externalLink: "https://open.spotify.com/track/5X6TRZfx9AE3Bd0M1FZkr8",
    },
  ],
} as const satisfies Track
