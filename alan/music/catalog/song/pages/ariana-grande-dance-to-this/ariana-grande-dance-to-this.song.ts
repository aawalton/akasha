import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDanceToThis = {
  id: "019ea4e0-9382-73d4-be60-6c0c722c55a9",
  type: "page-type/song",
  slug: "ariana-grande-dance-to-this",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1566c412-4381-4e93-9577-3734c1ac1c1d",
      externalLink: "https://musicbrainz.org/work/1566c412-4381-4e93-9577-3734c1ac1c1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dance to This",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:37:21.794Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
