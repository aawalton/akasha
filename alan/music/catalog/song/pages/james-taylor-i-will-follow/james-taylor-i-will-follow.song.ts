import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIWillFollow = {
  id: "01a0b72f-3278-7e29-a0ea-89778cca697b",
  type: "page-type/song",
  slug: "james-taylor-i-will-follow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "067fb2b4-f791-44a4-b226-f345c5c8dc32",
      externalLink: "https://musicbrainz.org/work/067fb2b4-f791-44a4-b226-f345c5c8dc32",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Will Follow",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
