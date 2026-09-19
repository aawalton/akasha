import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheGreatest = {
  id: "019ea4cc-6e18-7271-ba7f-cec0ee4756ab",
  type: "page-type/song",
  slug: "sia-the-greatest",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "620f7a88-b003-4492-9028-89d742fa5d2e",
      externalLink: "https://musicbrainz.org/work/620f7a88-b003-4492-9028-89d742fa5d2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Greatest",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
