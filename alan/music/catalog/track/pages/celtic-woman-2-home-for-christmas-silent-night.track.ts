import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2HomeForChristmasSilentNight = {
  id: "01a0abea-6d64-7097-b19b-3fbe755847cb",
  type: "page-type/track",
  slug: "celtic-woman-2-home-for-christmas-silent-night",
  ownLength: 3.5957666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-home-for-christmas"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4o0Lny4Nn4kqhamRex12DR",
      externalLink: "https://open.spotify.com/track/4o0Lny4Nn4kqhamRex12DR",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Silent Night",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "silentnight|6NWtt9pNOL2Gx7kBykdE5x|215746",
  song: "song/celtic-woman-silent-night",
} as const satisfies Track
