import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDieForYou = {
  id: "019ea4e2-7deb-745e-b864-bbf75c4ef90a",
  type: "page-type/song",
  slug: "ariana-grande-die-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9f6b1fe4-458c-467c-88b6-39209961250f",
      externalLink: "https://musicbrainz.org/work/9f6b1fe4-458c-467c-88b6-39209961250f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Die for You",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
