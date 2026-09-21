import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasWeWishYouAMerryChristmas = {
  id: "01a0abea-56a8-719e-8a82-a13a1497ad1a",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-we-wish-you-a-merry-christmas",
  ownLength: 3.4473333333333334,
  ownProgress: 3.4473333333333334,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LFNe3bM39xsC7wkYCTCKX",
      externalLink: "https://open.spotify.com/track/7LFNe3bM39xsC7wkYCTCKX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "We Wish You A Merry Christmas",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "wewishyouamerrychristmas|6NWtt9pNOL2Gx7kBykdE5x|206840",
  song: "song/celtic-woman-we-wish-you-a-merry-christmas",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 1,
      externalId: "7LFNe3bM39xsC7wkYCTCKX",
      externalLink: "https://open.spotify.com/track/7LFNe3bM39xsC7wkYCTCKX",
    },
  ],
} as const satisfies Track
