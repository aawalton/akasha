import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNobodyButYou = {
  id: "01a0b72f-4042-76e3-a7b7-8295e8f372ae",
  type: "page-type/song",
  slug: "james-taylor-nobody-but-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5c4f1a7-d3de-4b59-829f-189696eb002d",
      externalLink: "https://musicbrainz.org/work/c5c4f1a7-d3de-4b59-829f-189696eb002d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nobody But You",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
