import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAintNoSong = {
  id: "01a0b72f-2139-78c6-acfb-4efceade31f8",
  type: "page-type/song",
  slug: "james-taylor-aint-no-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1d8de858-0655-404d-ba22-ba6226fff60e",
      externalLink: "https://musicbrainz.org/work/1d8de858-0655-404d-ba22-ba6226fff60e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ain’t No Song",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
