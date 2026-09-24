import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyRightThere = {
  id: "01a0a6c5-2fa6-7678-a1b6-9535e45385a7",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-right-there",
  ownLength: 4.118,
  ownProgress: 4.118,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Right There",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Big Sean" }],
  trackKey: "rightthere|0c173mlxpT3dSFRgMO8XPh,66CXWjxzNUsdJxJ2JdwvnR|247080",
  song: "song/ariana-grande-right-there",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 3,
      externalId: "3yiopxxeHuwcpAg4e57Zjt",
      externalLink: "https://open.spotify.com/track/3yiopxxeHuwcpAg4e57Zjt",
    },
  ],
} as const satisfies Track
