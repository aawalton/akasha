import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationThePartingGlass = {
  id: "01a0abea-5688-7464-a338-bcc16642fae8",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-the-parting-glass",
  ownLength: 4.5411,
  ownProgress: 4.5411,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Parting Glass",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thepartingglass|6NWtt9pNOL2Gx7kBykdE5x|272466",
  song: "song/celtic-woman-the-parting-glass",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celebration",
      discNumber: 1,
      position: 14,
      externalId: "2LvGE9gWeFfDZMWRLUfays",
      externalLink: "https://open.spotify.com/track/2LvGE9gWeFfDZMWRLUfays",
    },
  ],
} as const satisfies Track
