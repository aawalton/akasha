import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIWasOnlyTellingALie = {
  id: "01a0b72f-3f0f-7948-836a-bf04bec2cd72",
  type: "page-type/song",
  slug: "james-taylor-i-was-only-telling-a-lie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8fddca9-f232-4f5a-aa21-366a6a9f76c1",
      externalLink: "https://musicbrainz.org/work/b8fddca9-f232-4f5a-aa21-366a6a9f76c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Was Only Telling a Lie",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
