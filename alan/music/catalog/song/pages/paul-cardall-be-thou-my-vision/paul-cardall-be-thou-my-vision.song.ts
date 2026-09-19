import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeThouMyVision = {
  id: "01a0b779-d584-7f5a-afdc-e712269dacaa",
  type: "page-type/song",
  slug: "paul-cardall-be-thou-my-vision",
  title: "Be Thou My Vision",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
