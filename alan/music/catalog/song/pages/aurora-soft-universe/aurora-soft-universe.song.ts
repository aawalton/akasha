import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSoftUniverse = {
  id: "019ea4a4-58bc-72a9-907c-88178b31e6fb",
  type: "page-type/song",
  slug: "aurora-soft-universe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "41c28a9a-10d5-4396-ad55-d351a529cbf9",
      externalLink: "https://musicbrainz.org/work/41c28a9a-10d5-4396-ad55-d351a529cbf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soft Universe",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
