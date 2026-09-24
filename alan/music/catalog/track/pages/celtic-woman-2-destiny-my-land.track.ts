import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyMyLand = {
  id: "01a0abea-67f6-73c3-9299-939f95ffcff4",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-my-land",
  ownLength: 4.082333333333334,
  ownProgress: 4.082333333333334,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Land",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "myland|6NWtt9pNOL2Gx7kBykdE5x|244940",
  song: "song/celtic-woman-my-land",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 1,
      externalId: "3puypV6zNNuzgrzPddQuON",
      externalLink: "https://open.spotify.com/track/3puypV6zNNuzgrzPddQuON",
    },
  ],
} as const satisfies Track
