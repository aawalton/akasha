import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeObvious = {
  id: "019ea4e4-9673-79eb-9dd5-23eab4122a3a",
  type: "page-type/song",
  slug: "ariana-grande-obvious",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "388c06d5-43b7-42ab-98f2-214acd844616",
      externalLink: "https://musicbrainz.org/work/388c06d5-43b7-42ab-98f2-214acd844616",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "obvious",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
