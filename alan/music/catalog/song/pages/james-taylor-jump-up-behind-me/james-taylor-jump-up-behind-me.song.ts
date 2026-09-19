import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorJumpUpBehindMe = {
  id: "01a0b779-6a3f-795c-9f42-25dd55cdd0fd",
  type: "page-type/song",
  slug: "james-taylor-jump-up-behind-me",
  title: "Jump Up Behind Me",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
