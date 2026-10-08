import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGetWellSoon = {
  id: "019ea4e3-dace-7b04-996d-98ee5d776489",
  type: "page-type/song",
  slug: "ariana-grande-get-well-soon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e77cfdff-b54f-4645-bfc6-dc72a5c78bce",
      externalLink: "https://musicbrainz.org/work/e77cfdff-b54f-4645-bfc6-dc72a5c78bce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "get well soon",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:40:56.654Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
