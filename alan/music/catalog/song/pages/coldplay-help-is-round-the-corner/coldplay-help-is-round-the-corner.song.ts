import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHelpIsRoundTheCorner = {
  id: "01a0ba5d-49f5-7682-8624-f6101f55e97d",
  type: "page-type/song",
  slug: "coldplay-help-is-round-the-corner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f08a773e-ce2a-44e5-b09b-215932313444",
      externalLink: "https://musicbrainz.org/work/f08a773e-ce2a-44e5-b09b-215932313444",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Help Is Round the Corner",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
