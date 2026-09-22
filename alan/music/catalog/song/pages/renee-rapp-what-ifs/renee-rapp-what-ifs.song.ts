import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappWhatIfs = {
  id: "01a0caa9-00be-7325-8351-7607e2997d45",
  type: "page-type/song",
  slug: "renee-rapp-what-ifs",
  title: "What Ifs",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
