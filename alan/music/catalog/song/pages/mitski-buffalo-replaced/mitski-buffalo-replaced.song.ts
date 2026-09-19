import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBuffaloReplaced = {
  id: "019f0e9d-c5fa-7ab0-8389-64cc34e3877c",
  type: "page-type/song",
  slug: "mitski-buffalo-replaced",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "253d0143-d90d-4531-9ab8-570df1005d1e",
      externalLink: "https://musicbrainz.org/work/253d0143-d90d-4531-9ab8-570df1005d1e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Buffalo Replaced",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
