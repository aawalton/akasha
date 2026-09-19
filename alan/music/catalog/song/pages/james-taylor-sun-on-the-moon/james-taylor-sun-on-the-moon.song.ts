import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSunOnTheMoon = {
  id: "01a0b72f-4e16-7391-9cb7-b11299c8d071",
  type: "page-type/song",
  slug: "james-taylor-sun-on-the-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78afb733-867f-4b3b-8f33-87fcaee055b6",
      externalLink: "https://musicbrainz.org/work/78afb733-867f-4b3b-8f33-87fcaee055b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sun on the Moon",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
