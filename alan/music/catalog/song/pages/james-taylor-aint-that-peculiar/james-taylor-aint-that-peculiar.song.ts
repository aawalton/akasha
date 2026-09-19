import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAintThatPeculiar = {
  id: "01a0b72f-2a70-7b57-b24f-e08b858e5dec",
  type: "page-type/song",
  slug: "james-taylor-aint-that-peculiar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3624a08-6612-3bd8-bdf8-fe8a21f8f0e4",
      externalLink: "https://musicbrainz.org/work/a3624a08-6612-3bd8-bdf8-fe8a21f8f0e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ain’t That Peculiar",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
