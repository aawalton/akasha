import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const cynthiaErivoTheWizardAndI = {
  id: "01a0b7a7-14cf-7388-933e-4108fff79654",
  type: "page-type/song",
  slug: "cynthia-erivo-the-wizard-and-i",
  title: "The Wizard And I",
  artist: "artist/cynthia-erivo",
  performed: true,
} as const satisfies Song
