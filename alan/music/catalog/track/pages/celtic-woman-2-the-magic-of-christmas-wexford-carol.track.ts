import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasWexfordCarol = {
  id: "01a0abea-57ef-7ba3-935c-975891b11ed9",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-wexford-carol",
  ownLength: 3.0164333333333335,
  ownProgress: 3.0164333333333335,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wexford Carol",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "wexfordcarol|6NWtt9pNOL2Gx7kBykdE5x|180986",
  song: "song/celtic-woman-wexford-carol",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 12,
      externalId: "6OgmSuK2mhGdKWYSoszPTI",
      externalLink: "https://open.spotify.com/track/6OgmSuK2mhGdKWYSoszPTI",
    },
  ],
} as const satisfies Track
