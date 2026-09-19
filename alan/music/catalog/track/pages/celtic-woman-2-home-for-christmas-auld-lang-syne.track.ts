import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2HomeForChristmasAuldLangSyne = {
  id: "01a0abea-6e56-77c6-b4ec-72d566417485",
  type: "page-type/track",
  slug: "celtic-woman-2-home-for-christmas-auld-lang-syne",
  ownLength: 3.45355,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-home-for-christmas"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gimDDa3tFPOvji1CrtRg3",
      externalLink: "https://open.spotify.com/track/1gimDDa3tFPOvji1CrtRg3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Auld Lang Syne",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "auldlangsyne|6NWtt9pNOL2Gx7kBykdE5x|207213",
  song: "song/celtic-woman-auld-lang-syne",
} as const satisfies Track
