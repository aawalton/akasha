import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIfILeave = {
  id: "019f0e9f-d29d-7494-9e14-cfbf020a4c08",
  type: "page-type/song",
  slug: "mitski-if-i-leave",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "479bf6d6-f135-4b18-a05c-a0fcbe98ca3c",
      externalLink: "https://musicbrainz.org/work/479bf6d6-f135-4b18-a05c-a0fcbe98ca3c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If I Leave",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
