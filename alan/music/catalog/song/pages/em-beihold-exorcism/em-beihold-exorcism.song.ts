import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdExorcism = {
  id: "019ea4df-9541-7911-977d-6e0cad05815c",
  type: "page-type/song",
  slug: "em-beihold-exorcism",
  title: "Exorcism",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bef07c50-6779-4543-9f40-af239949a4f9",
      externalLink: "https://musicbrainz.org/work/bef07c50-6779-4543-9f40-af239949a4f9",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
