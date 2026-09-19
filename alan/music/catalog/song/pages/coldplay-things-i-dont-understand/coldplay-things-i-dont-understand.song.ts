import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayThingsIDontUnderstand = {
  id: "01a0ba5d-50e7-74b4-bebb-35675780b226",
  type: "page-type/song",
  slug: "coldplay-things-i-dont-understand",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "593ff471-22ed-4bfb-8ff0-a043c866959e",
      externalLink: "https://musicbrainz.org/work/593ff471-22ed-4bfb-8ff0-a043c866959e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Things I Don’t Understand",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
