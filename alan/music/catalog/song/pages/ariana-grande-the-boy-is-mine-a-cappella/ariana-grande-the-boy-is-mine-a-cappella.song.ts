import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheBoyIsMineACappella = {
  id: "01a0b76f-fb2b-7dc4-bf5b-c35128d53e37",
  type: "page-type/song",
  slug: "ariana-grande-the-boy-is-mine-a-cappella",
  title: "the boy is mine – a cappella",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
