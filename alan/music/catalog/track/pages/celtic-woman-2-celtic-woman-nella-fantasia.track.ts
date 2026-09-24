import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanNellaFantasia = {
  id: "01a0abea-7987-79ce-9342-b8f6a3b1a1e7",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-nella-fantasia",
  ownLength: 3.6728833333333335,
  ownProgress: 3.6728833333333335,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nella Fantasia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "nellafantasia|6NWtt9pNOL2Gx7kBykdE5x|220373",
  song: "song/celtic-woman-nella-fantasia",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 12,
      externalId: "4IR9up5ZrC9x1T12ePgY8g",
      externalLink: "https://open.spotify.com/track/4IR9up5ZrC9x1T12ePgY8g",
    },
  ],
} as const satisfies Track
