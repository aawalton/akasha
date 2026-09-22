import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSabraGirl = {
  id: "01a0caa8-b9e8-731a-a193-616946cf49b3",
  type: "page-type/song",
  slug: "nickel-creek-sabra-girl",
  title: "Sabra Girl",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
