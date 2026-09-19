import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEasyToPlease = {
  id: "01a0ba5d-4721-7249-9be0-8c035ddfaff8",
  type: "page-type/song",
  slug: "coldplay-easy-to-please",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c92c0339-4dc1-3702-bc8a-dd8a22a0aa0b",
      externalLink: "https://musicbrainz.org/work/c92c0339-4dc1-3702-bc8a-dd8a22a0aa0b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Easy to Please",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
