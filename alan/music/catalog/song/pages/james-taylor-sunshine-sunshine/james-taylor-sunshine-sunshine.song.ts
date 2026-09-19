import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSunshineSunshine = {
  id: "01a0b72f-4e9d-73c1-9b83-c883f57ed011",
  type: "page-type/song",
  slug: "james-taylor-sunshine-sunshine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7e1127f4-5139-473d-9746-e9b9ea5a27e6",
      externalLink: "https://musicbrainz.org/work/7e1127f4-5139-473d-9746-e9b9ea5a27e6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunshine Sunshine",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
