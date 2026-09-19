import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyRightThere = {
  id: "01a0a6c5-2fa6-7678-a1b6-9535e45385a7",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-right-there",
  ownLength: 4.118,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yiopxxeHuwcpAg4e57Zjt",
      externalLink: "https://open.spotify.com/track/3yiopxxeHuwcpAg4e57Zjt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Right There",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0c173mlxpT3dSFRgMO8XPh", artistName: "Big Sean" },
  ],
  trackKey: "rightthere|0c173mlxpT3dSFRgMO8XPh,66CXWjxzNUsdJxJ2JdwvnR|247080",
  song: "song/ariana-grande-right-there",
} as const satisfies Track
