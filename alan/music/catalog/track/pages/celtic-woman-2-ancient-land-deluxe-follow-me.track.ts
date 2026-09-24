import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeFollowMe = {
  id: "01a0abea-58b5-7792-8456-b9e554ec2748",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-follow-me",
  ownLength: 3.6437666666666666,
  ownProgress: 3.6437666666666666,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Follow Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "followme|6NWtt9pNOL2Gx7kBykdE5x|218626",
  song: "song/celtic-woman-follow-me",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 4,
      externalId: "4sNXHUpqUmKuOdPMKRlDkI",
      externalLink: "https://open.spotify.com/track/4sNXHUpqUmKuOdPMKRlDkI",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "12qoDstHWzwTjogD1NvCIh",
      externalLink: "https://open.spotify.com/track/12qoDstHWzwTjogD1NvCIh",
    },
  ],
} as const satisfies Track
