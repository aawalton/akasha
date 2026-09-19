import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGenius = {
  id: "019ea4ca-1535-7484-9795-9d7b51dc8256",
  type: "page-type/song",
  slug: "sia-genius",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "de51a8e6-74ec-4ab2-acc7-b28e7224f5d9",
      externalLink: "https://musicbrainz.org/work/de51a8e6-74ec-4ab2-acc7-b28e7224f5d9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Genius",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
