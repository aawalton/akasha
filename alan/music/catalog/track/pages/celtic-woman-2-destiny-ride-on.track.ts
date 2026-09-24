import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyRideOn = {
  id: "01a0abea-683b-7cf1-b53c-107a98b1735e",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-ride-on",
  ownLength: 3.9259833333333334,
  ownProgress: 3.9259833333333334,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ride On",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "rideon|6NWtt9pNOL2Gx7kBykdE5x|235559",
  song: "song/celtic-woman-ride-on",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 3,
      externalId: "0pxw4QQye67Vq7cYmHZPCZ",
      externalLink: "https://open.spotify.com/track/0pxw4QQye67Vq7cYmHZPCZ",
    },
  ],
} as const satisfies Track
