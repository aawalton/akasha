import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasFelizNavidad = {
  id: "01a0abea-5841-73f6-957f-485f9ca6d3d8",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-feliz-navidad",
  ownLength: 3.5477666666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SNLOUQc44QiXIyFYeYi00",
      externalLink: "https://open.spotify.com/track/3SNLOUQc44QiXIyFYeYi00",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Feliz Navidad",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "feliznavidad|6NWtt9pNOL2Gx7kBykdE5x|212866",
  song: "song/celtic-woman-feliz-navidad",
} as const satisfies Track
