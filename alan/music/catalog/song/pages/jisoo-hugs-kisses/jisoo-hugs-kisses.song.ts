import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooHugsKisses = {
  id: "01a0b724-38d8-7aa6-bc2e-763ecf23fb58",
  type: "page-type/song",
  slug: "jisoo-hugs-kisses",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a413cec1-c85d-47a8-b05d-0462176a905f",
      externalLink: "https://musicbrainz.org/work/a413cec1-c85d-47a8-b05d-0462176a905f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hugs & Kisses",
  artist: "artist/jisoo",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
