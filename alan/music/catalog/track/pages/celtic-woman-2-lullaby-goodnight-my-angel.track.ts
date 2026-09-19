import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyGoodnightMyAngel = {
  id: "01a0abea-7155-7a94-8d45-90a93b978614",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-goodnight-my-angel",
  ownLength: 3.2462166666666668,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bNTYrQBhfZ3v2TuS2hyfB",
      externalLink: "https://open.spotify.com/track/5bNTYrQBhfZ3v2TuS2hyfB",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Goodnight My Angel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "goodnightmyangel|6NWtt9pNOL2Gx7kBykdE5x|194773",
  song: "song/celtic-woman-goodnight-my-angel",
} as const satisfies Track
