import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyWalkingInTheAir = {
  id: "01a0abea-71c7-7834-94b0-6bb2a22a1c9c",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-walking-in-the-air",
  ownLength: 3.5071,
  ownProgress: 3.5071,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Walking In The Air",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }, { artistName: "Chloe Agnew" }],
  trackKey: "walkingintheair|34sL9HIOU50t8u0IQMZeze,6NWtt9pNOL2Gx7kBykdE5x|210426",
  song: "song/aurora-walking-in-the-air",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 7,
      externalId: "3J3PDJmXoZeZ36Q9j5hVOI",
      externalLink: "https://open.spotify.com/track/3J3PDJmXoZeZ36Q9j5hVOI",
    },
  ],
} as const satisfies Track
