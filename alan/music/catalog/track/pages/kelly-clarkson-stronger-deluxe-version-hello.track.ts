import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionHello = {
  id: "01a0a5ae-c33c-78e0-9103-31b8eb83acdb",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-hello",
  ownLength: 2.9922166666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "71esoHcSEs614vlMn2Mtnl",
      externalLink: "https://open.spotify.com/track/71esoHcSEs614vlMn2Mtnl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hello",
} as const satisfies Track
