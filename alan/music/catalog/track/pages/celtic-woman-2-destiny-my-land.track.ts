import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyMyLand = {
  id: "01a0abea-67f6-73c3-9299-939f95ffcff4",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-my-land",
  ownLength: 4.082333333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3puypV6zNNuzgrzPddQuON",
      externalLink: "https://open.spotify.com/track/3puypV6zNNuzgrzPddQuON",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Land",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "myland|6NWtt9pNOL2Gx7kBykdE5x|244940",
  song: "song/celtic-woman-my-land",
} as const satisfies Track
