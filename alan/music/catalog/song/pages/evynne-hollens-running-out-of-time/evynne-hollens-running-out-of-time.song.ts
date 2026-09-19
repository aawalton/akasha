import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensRunningOutOfTime = {
  id: "019ea4cf-662e-7139-93b7-4c51c8ee27d6",
  type: "page-type/song",
  slug: "evynne-hollens-running-out-of-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa9264bc-9fe5-4a9e-9a61-d4faf69d6521",
      externalLink: "https://musicbrainz.org/work/fa9264bc-9fe5-4a9e-9a61-d4faf69d6521",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Running Out of Time",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
