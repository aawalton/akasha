import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallInTheBleakMidwinter = {
  id: "01a0b717-54a6-729d-9735-380e417abd51",
  type: "page-type/song",
  slug: "paul-cardall-in-the-bleak-midwinter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c43c39d-7642-3f5b-973b-e8c0ff098c04",
      externalLink: "https://musicbrainz.org/work/9c43c39d-7642-3f5b-973b-e8c0ff098c04",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In the Bleak Midwinter",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
