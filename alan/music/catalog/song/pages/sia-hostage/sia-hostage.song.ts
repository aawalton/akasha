import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHostage = {
  id: "019ea4c6-fa09-71ff-bb46-6f2e59ccdc6e",
  type: "page-type/song",
  slug: "sia-hostage",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17601892-75ca-4da6-9d2e-5fde6751b3fc",
      externalLink: "https://musicbrainz.org/work/17601892-75ca-4da6-9d2e-5fde6751b3fc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hostage",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
