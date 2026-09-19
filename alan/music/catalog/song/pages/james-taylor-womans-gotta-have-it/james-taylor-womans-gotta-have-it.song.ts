import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWomansGottaHaveIt = {
  id: "01a0b72f-524b-76ea-aab7-6524d3179667",
  type: "page-type/song",
  slug: "james-taylor-womans-gotta-have-it",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b82c25f5-aa72-47f8-9961-5812c3813d91",
      externalLink: "https://musicbrainz.org/work/b82c25f5-aa72-47f8-9961-5812c3813d91",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Woman’s Gotta Have It",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
