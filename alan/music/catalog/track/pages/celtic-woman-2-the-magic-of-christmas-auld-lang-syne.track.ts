import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasAuldLangSyne = {
  id: "01a0abea-5825-703e-8a69-257ed477bc19",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-auld-lang-syne",
  ownLength: 4.652,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wBkeNGC9sAzLsbOGPdHVD",
      externalLink: "https://open.spotify.com/track/3wBkeNGC9sAzLsbOGPdHVD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Auld Lang Syne",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "auldlangsyne|6NWtt9pNOL2Gx7kBykdE5x|279120",
  song: "song/celtic-woman-auld-lang-syne",
} as const satisfies Track
