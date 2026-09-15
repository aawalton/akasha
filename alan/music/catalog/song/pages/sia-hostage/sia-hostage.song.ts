import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHostage = {
  id: "019ea4c6-fa09-71ff-bb46-6f2e59ccdc6e",
  type: "page-type/song",
  slug: "sia-hostage",
  title: "Hostage",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17601892-75ca-4da6-9d2e-5fde6751b3fc",
      externalLink: "https://musicbrainz.org/work/17601892-75ca-4da6-9d2e-5fde6751b3fc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
