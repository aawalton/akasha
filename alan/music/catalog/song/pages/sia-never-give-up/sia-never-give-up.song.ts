import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNeverGiveUp = {
  id: "019ea4c8-952e-7364-968f-e9803ccfc0b8",
  type: "page-type/song",
  slug: "sia-never-give-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79745379-e997-43a0-b649-e81c19b86478",
      externalLink: "https://musicbrainz.org/work/79745379-e997-43a0-b649-e81c19b86478",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Give Up",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
