import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyOverTheRainbow = {
  id: "01a0abea-717a-7496-922a-c67f08cab2e9",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-over-the-rainbow",
  ownLength: 2.6631,
  ownProgress: 2.6631,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Over The Rainbow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|159786",
  song: "song/celtic-woman-over-the-rainbow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 5,
      externalId: "10BNUjunt6fxgWMidjpASq",
      externalLink: "https://open.spotify.com/track/10BNUjunt6fxgWMidjpASq",
    },
  ],
} as const satisfies Track
