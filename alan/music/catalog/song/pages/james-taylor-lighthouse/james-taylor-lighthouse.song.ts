import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLighthouse = {
  id: "01a0b72f-3302-740a-bde0-5963e430a285",
  type: "page-type/song",
  slug: "james-taylor-lighthouse",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a787eb0-33f8-4e51-a2b9-3057cfa2c2a2",
      externalLink: "https://musicbrainz.org/work/1a787eb0-33f8-4e51-a2b9-3057cfa2c2a2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lighthouse",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
