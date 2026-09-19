import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHowIFeel = {
  id: "019ea4b0-cb6f-72a5-ae39-1132fa4f3ec1",
  type: "page-type/song",
  slug: "kelly-clarkson-how-i-feel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ea08aed3-2e8b-4543-82c4-b6f772b616dc",
      externalLink: "https://musicbrainz.org/work/ea08aed3-2e8b-4543-82c4-b6f772b616dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How I Feel",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
