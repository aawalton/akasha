import type { Filing } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { songKey } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"

export const FILED_ARTIST = "sylvia-daley"

export const ELF = [songKey(FILED_ARTIST, "Elf"), "sylvia-daley-elf"] as const

export function filingOf(songs: readonly (readonly [string, string])[] = [ELF]): Filing {
  return {
    songs: new Map(songs),
    taken: new Set(songs.map(([, slug]) => slug)),
    artists: new Set([FILED_ARTIST]),
  }
}
