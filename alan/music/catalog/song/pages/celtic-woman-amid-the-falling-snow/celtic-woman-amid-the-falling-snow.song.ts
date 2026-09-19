import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAmidTheFallingSnow = {
  id: "01a0b720-0780-71c5-9fa1-e984b566f8df",
  type: "page-type/song",
  slug: "celtic-woman-amid-the-falling-snow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16938570-28ad-3434-9d9a-bd95867065fd",
      externalLink: "https://musicbrainz.org/work/16938570-28ad-3434-9d9a-bd95867065fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amid the Falling Snow",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
