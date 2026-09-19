import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBroken = {
  id: "01a0ba5d-3e22-73af-bde2-7140db176b23",
  type: "page-type/song",
  slug: "coldplay-broken",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a0e90ac-350c-4911-a872-e8d401419673",
      externalLink: "https://musicbrainz.org/work/6a0e90ac-350c-4911-a872-e8d401419673",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "BrokEn",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
