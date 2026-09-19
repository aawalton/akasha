import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraCureForMe = {
  id: "019ea4a3-e0c0-7437-935b-7f04d41893dc",
  type: "page-type/song",
  slug: "aurora-cure-for-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26e94c71-aed5-4aaa-86c1-d5dca29a9415",
      externalLink: "https://musicbrainz.org/work/26e94c71-aed5-4aaa-86c1-d5dca29a9415",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cure for Me",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
