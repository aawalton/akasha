import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLostCause = {
  id: "019ea4a9-9402-7d2e-bcc7-567f115cb59c",
  type: "page-type/song",
  slug: "billie-eilish-lost-cause",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "564cd0a0-b3b3-4740-ad23-16798c1b791a",
      externalLink: "https://musicbrainz.org/work/564cd0a0-b3b3-4740-ad23-16798c1b791a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost Cause",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
