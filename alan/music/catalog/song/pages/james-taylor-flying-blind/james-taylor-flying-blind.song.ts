import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFlyingBlind = {
  id: "01a0b72f-29af-738d-a1cd-cccd55733bb9",
  type: "page-type/song",
  slug: "james-taylor-flying-blind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "976aa4b9-c264-4338-b948-f92c081da74a",
      externalLink: "https://musicbrainz.org/work/976aa4b9-c264-4338-b948-f92c081da74a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flying Blind",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
