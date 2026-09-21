import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeOrinocoFlow = {
  id: "01a0abea-5abc-75b1-ab2d-58d5f5092b3f",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-orinoco-flow",
  ownLength: 3.87155,
  ownProgress: 3.87155,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-orinoco-flow",
  ],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EVQbKJwWOzJSoYcph8mdE",
      externalLink: "https://open.spotify.com/track/7EVQbKJwWOzJSoYcph8mdE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Orinoco Flow",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "orinocoflow|6NWtt9pNOL2Gx7kBykdE5x|232293",
  song: "song/celtic-woman-orinoco-flow",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 20,
      externalId: "7EVQbKJwWOzJSoYcph8mdE",
      externalLink: "https://open.spotify.com/track/7EVQbKJwWOzJSoYcph8mdE",
    },
    {
      release: "release/celtic-woman-2-orinoco-flow",
      discNumber: 1,
      position: 1,
      externalId: "6iPDETSDz9B6hd819WWFgn",
      externalLink: "https://open.spotify.com/track/6iPDETSDz9B6hd819WWFgn",
    },
  ],
} as const satisfies Track
