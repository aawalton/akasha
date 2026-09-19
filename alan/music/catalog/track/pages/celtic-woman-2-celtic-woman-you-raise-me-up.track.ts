import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanYouRaiseMeUp = {
  id: "01a0abea-7a15-764e-b1b5-0561955eb444",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-you-raise-me-up",
  ownLength: 4.518883333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03wrmep5c3Dr9JlOXPvFUX",
      externalLink: "https://open.spotify.com/track/03wrmep5c3Dr9JlOXPvFUX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You Raise Me Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "youraisemeup|6NWtt9pNOL2Gx7kBykdE5x|271133",
  song: "song/celtic-woman-you-raise-me-up",
} as const satisfies Track
