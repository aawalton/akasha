import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAvatarTheTheme = {
  id: "01a0b77f-f9ca-7ad8-9184-6be15b14aa07",
  type: "page-type/song",
  slug: "the-piano-guys-avatar-the-theme",
  title: "Avatar (The Theme)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
