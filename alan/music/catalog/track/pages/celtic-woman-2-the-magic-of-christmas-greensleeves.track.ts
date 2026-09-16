import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasGreensleeves = {
  id: "01a0abea-5794-7c16-8bbe-51b60f1aa989",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-greensleeves",
  ownLength: 3.6151,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5E0QjQR6LUqVdz47O7a0Mt",
      externalLink: "https://open.spotify.com/track/5E0QjQR6LUqVdz47O7a0Mt",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Greensleeves",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "greensleeves|6NWtt9pNOL2Gx7kBykdE5x|216906",
} as const satisfies Track
