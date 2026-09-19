import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheBoyIsMineInstrumental = {
  id: "01a0b76f-fc6f-715a-979d-41aca7dee5ff",
  type: "page-type/song",
  slug: "ariana-grande-the-boy-is-mine-instrumental",
  title: "the boy is mine – instrumental",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
