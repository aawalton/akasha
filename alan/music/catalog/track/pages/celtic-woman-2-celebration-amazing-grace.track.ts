import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationAmazingGrace = {
  id: "01a0abea-559a-77d8-8229-e39b5fc68864",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-amazing-grace",
  ownLength: 5.0151,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wfewEg6wiNeYUcBPT4b0w",
      externalLink: "https://open.spotify.com/track/7wfewEg6wiNeYUcBPT4b0w",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Amazing Grace",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "amazinggrace|6NWtt9pNOL2Gx7kBykdE5x|300906",
  song: "song/celtic-woman-amazing-grace",
} as const satisfies Track
