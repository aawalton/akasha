import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGetWellSoon = {
  id: "019ea4e3-dace-7b04-996d-98ee5d776489",
  type: "song",
  slug: "ariana-grande-get-well-soon",
  title: "get well soon",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e77cfdff-b54f-4645-bfc6-dc72a5c78bce",
      externalLink: "https://musicbrainz.org/work/e77cfdff-b54f-4645-bfc6-dc72a5c78bce",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
