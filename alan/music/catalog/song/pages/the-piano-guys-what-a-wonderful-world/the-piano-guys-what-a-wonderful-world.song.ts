import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhatAWonderfulWorld = {
  id: "01a0b71e-9ed4-705f-a67f-a9ed6fa70dfa",
  type: "page-type/song",
  slug: "the-piano-guys-what-a-wonderful-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e7364956-ed0f-3fba-ae9a-d85faa558629",
      externalLink: "https://musicbrainz.org/work/e7364956-ed0f-3fba-ae9a-d85faa558629",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What a Wonderful World",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
