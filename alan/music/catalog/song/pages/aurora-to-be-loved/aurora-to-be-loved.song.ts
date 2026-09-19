import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraToBeLoved = {
  id: "01a0b770-e651-7a00-b840-eedcd3aad74d",
  type: "page-type/song",
  slug: "aurora-to-be-loved",
  title: "To Be Loved",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
