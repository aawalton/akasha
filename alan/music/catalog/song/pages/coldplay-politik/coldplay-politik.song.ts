import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPolitik = {
  id: "01a0ba60-fb6d-7492-9b25-fba8fada38d7",
  type: "page-type/song",
  slug: "coldplay-politik",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5d8e2a2-3bcd-3d06-9ae8-3b392b786b52",
      externalLink: "https://musicbrainz.org/work/d5d8e2a2-3bcd-3d06-9ae8-3b392b786b52",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Politik",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:55:13.133Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
