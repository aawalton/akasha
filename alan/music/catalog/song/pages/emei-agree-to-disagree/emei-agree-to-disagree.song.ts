import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiAgreeToDisagree = {
  id: "01a0c43e-7461-7ecc-b892-9f0a8c7fe097",
  type: "page-type/song",
  slug: "emei-agree-to-disagree",
  title: "Agree to Disagree",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
