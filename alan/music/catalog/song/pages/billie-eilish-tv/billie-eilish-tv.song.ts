import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTv = {
  id: "019ea4ab-4f66-7552-999f-3b4ce76f1f64",
  type: "page-type/song",
  slug: "billie-eilish-tv",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4c211a7-df35-4815-b93c-72f6861b30c6",
      externalLink: "https://musicbrainz.org/work/d4c211a7-df35-4815-b93c-72f6861b30c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "TV",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
