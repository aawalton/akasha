import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandCountyDown = {
  id: "01a0abea-5c44-7260-8a17-7c08ebf622f1",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-county-down",
  ownLength: 3.7268833333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0t0jSK7QTP5VMpXOhvMAas",
      externalLink: "https://open.spotify.com/track/0t0jSK7QTP5VMpXOhvMAas",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "County Down",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "countydown|6NWtt9pNOL2Gx7kBykdE5x|223613",
  song: "song/celtic-woman-county-down",
} as const satisfies Track
