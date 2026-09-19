import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBreatheMe = {
  id: "019ea4c6-49d6-71ad-bffe-33969fe63d8a",
  type: "page-type/song",
  slug: "sia-breathe-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e9d630f1-998d-4ec6-86b6-a6b555bd16a7",
      externalLink: "https://musicbrainz.org/work/e9d630f1-998d-4ec6-86b6-a6b555bd16a7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breathe Me",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
