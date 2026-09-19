import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonDonTLetMeBeYours = {
  id: "019ea49e-9d9d-7afb-b485-9af1a7a5aed6",
  type: "page-type/song",
  slug: "zara-larsson-don-t-let-me-be-yours",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29897144-3162-4724-b2ab-0307b766009a",
      externalLink: "https://musicbrainz.org/work/29897144-3162-4724-b2ab-0307b766009a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Let Me Be Yours",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
