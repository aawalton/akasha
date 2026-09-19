import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTakingItIn = {
  id: "01a0b72f-4b11-7c31-bedc-37e5bbe93b9b",
  type: "page-type/song",
  slug: "james-taylor-taking-it-in",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4582853a-03bf-4e75-9d90-3beaa17d87e9",
      externalLink: "https://musicbrainz.org/work/4582853a-03bf-4e75-9d90-3beaa17d87e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Taking It In",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
