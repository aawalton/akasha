import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFathersEyes = {
  id: "01a0b71e-9f1f-75ec-90f7-81af5c1af965",
  type: "page-type/song",
  slug: "the-piano-guys-fathers-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eed3335c-edc3-4d50-a466-dee58d8ef3d2",
      externalLink: "https://musicbrainz.org/work/eed3335c-edc3-4d50-a466-dee58d8ef3d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Father's Eyes",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
