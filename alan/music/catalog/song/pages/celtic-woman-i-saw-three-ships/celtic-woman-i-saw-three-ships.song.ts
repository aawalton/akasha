import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanISawThreeShips = {
  id: "01a0b771-741a-7a66-b52f-a5fd113231b8",
  type: "page-type/song",
  slug: "celtic-woman-i-saw-three-ships",
  title: "I Saw Three Ships",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
