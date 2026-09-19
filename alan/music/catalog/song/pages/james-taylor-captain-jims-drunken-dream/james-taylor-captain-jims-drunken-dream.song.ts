import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCaptainJimsDrunkenDream = {
  id: "01a0b72f-2d7a-7670-ac2c-67afce0d5188",
  type: "page-type/song",
  slug: "james-taylor-captain-jims-drunken-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd47c47c-4822-402b-998c-2c377daa556b",
      externalLink: "https://musicbrainz.org/work/bd47c47c-4822-402b-998c-2c377daa556b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Captain Jim’s Drunken Dream",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
