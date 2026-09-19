import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonUncover = {
  id: "019ea4a0-9393-7691-86c8-666e812c8df8",
  type: "page-type/song",
  slug: "zara-larsson-uncover",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a9326c7-0143-49be-8d24-aefb4c505cc1",
      externalLink: "https://musicbrainz.org/work/9a9326c7-0143-49be-8d24-aefb4c505cc1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Uncover",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
