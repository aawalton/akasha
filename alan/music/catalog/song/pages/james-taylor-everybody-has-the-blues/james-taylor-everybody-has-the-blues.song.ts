import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorEverybodyHasTheBlues = {
  id: "01a0b72f-31e6-7784-9909-0060107fd2e5",
  type: "page-type/song",
  slug: "james-taylor-everybody-has-the-blues",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc5d8d32-6a7c-4b49-898c-57bc856906d8",
      externalLink: "https://musicbrainz.org/work/fc5d8d32-6a7c-4b49-898c-57bc856906d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everybody Has the Blues",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
