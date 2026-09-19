import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasWexfordCarol = {
  id: "01a0abea-57ef-7ba3-935c-975891b11ed9",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-wexford-carol",
  ownLength: 3.0164333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6OgmSuK2mhGdKWYSoszPTI",
      externalLink: "https://open.spotify.com/track/6OgmSuK2mhGdKWYSoszPTI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Wexford Carol",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "wexfordcarol|6NWtt9pNOL2Gx7kBykdE5x|180986",
  song: "song/celtic-woman-wexford-carol",
} as const satisfies Track
