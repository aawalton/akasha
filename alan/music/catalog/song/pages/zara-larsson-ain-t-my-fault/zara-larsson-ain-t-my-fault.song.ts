import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonAinTMyFault = {
  id: "019ea4a1-b4e2-7a30-8d95-8315a02d0909",
  type: "page-type/song",
  slug: "zara-larsson-ain-t-my-fault",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5874711-1c35-4470-93d5-34c2bf26dd01",
      externalLink: "https://musicbrainz.org/work/d5874711-1c35-4470-93d5-34c2bf26dd01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ain’t My Fault",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
