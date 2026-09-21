import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineGuiltyAsCharged = {
  id: "01a0c621-155d-743f-9972-8aedad92fc07",
  type: "page-type/song",
  slug: "jenna-raine-guilty-as-charged",
  title: "Guilty As Charged",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
