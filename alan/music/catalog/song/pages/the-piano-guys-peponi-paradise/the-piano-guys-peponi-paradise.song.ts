import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysPeponiParadise = {
  id: "01a0b71e-9da8-76c1-941a-6c3a8d6b6077",
  type: "page-type/song",
  slug: "the-piano-guys-peponi-paradise",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d06a76c3-b8cf-4242-b00f-e07b20876eff",
      externalLink: "https://musicbrainz.org/work/d06a76c3-b8cf-4242-b00f-e07b20876eff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Peponi (Paradise)",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
