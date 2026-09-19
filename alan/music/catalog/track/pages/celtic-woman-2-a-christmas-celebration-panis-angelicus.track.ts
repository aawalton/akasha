import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationPanisAngelicus = {
  id: "01a0abea-7760-7e58-a3c2-661f2fe2a648",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-panis-angelicus",
  ownLength: 3.9404333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MFwDxDcIe9iR6iftUqvel",
      externalLink: "https://open.spotify.com/track/3MFwDxDcIe9iR6iftUqvel",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Panis Angelicus",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "panisangelicus|6NWtt9pNOL2Gx7kBykdE5x|236426",
  song: "song/celtic-woman-panis-angelicus",
} as const satisfies Track
