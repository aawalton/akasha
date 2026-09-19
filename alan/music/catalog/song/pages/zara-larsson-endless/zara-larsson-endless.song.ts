import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonEndless = {
  id: "019ea49f-50ce-7075-b608-c66b2627d5fd",
  type: "page-type/song",
  slug: "zara-larsson-endless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4e2cf495-0ed9-4fe8-9f74-7f6658855895",
      externalLink: "https://musicbrainz.org/work/4e2cf495-0ed9-4fe8-9f74-7f6658855895",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Endless",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
