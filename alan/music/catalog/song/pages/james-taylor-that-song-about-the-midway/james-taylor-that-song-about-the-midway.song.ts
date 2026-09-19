import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThatSongAboutTheMidway = {
  id: "01a0b72f-4a9a-74d3-9fd4-747ef985f3f1",
  type: "page-type/song",
  slug: "james-taylor-that-song-about-the-midway",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c74e1b0-0f4d-3bec-9ce4-3e066b06f96f",
      externalLink: "https://musicbrainz.org/work/3c74e1b0-0f4d-3bec-9ce4-3e066b06f96f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That Song About the Midway",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
