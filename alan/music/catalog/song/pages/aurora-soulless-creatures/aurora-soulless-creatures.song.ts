import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSoullessCreatures = {
  id: "019ea4a5-bb8b-7c21-bc36-ca2fae683013",
  type: "page-type/song",
  slug: "aurora-soulless-creatures",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f46d9da-1f66-4b26-bcc9-8bb29273b875",
      externalLink: "https://musicbrainz.org/work/6f46d9da-1f66-4b26-bcc9-8bb29273b875",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soulless Creatures",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
