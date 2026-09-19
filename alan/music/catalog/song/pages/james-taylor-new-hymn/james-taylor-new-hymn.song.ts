import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNewHymn = {
  id: "01a0b72f-360d-7cbc-a2de-d6b30dfc7f32",
  type: "page-type/song",
  slug: "james-taylor-new-hymn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "41f70ae6-312b-4c6b-8d04-08bed74274cc",
      externalLink: "https://musicbrainz.org/work/41f70ae6-312b-4c6b-8d04-08bed74274cc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Hymn",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
