import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheBlade = {
  id: "01a0b770-f148-7b70-96f3-fa45db6d4e62",
  type: "page-type/song",
  slug: "aurora-the-blade",
  title: "The Blade",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
