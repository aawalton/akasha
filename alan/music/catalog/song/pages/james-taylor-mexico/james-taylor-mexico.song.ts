import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMexico = {
  id: "01a0b72f-3e65-7f11-b630-5ce354927c27",
  type: "page-type/song",
  slug: "james-taylor-mexico",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5892c7e-3378-40e1-a85f-2f159ee1c6fc",
      externalLink: "https://musicbrainz.org/work/b5892c7e-3378-40e1-a85f-2f159ee1c6fc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mexico",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
