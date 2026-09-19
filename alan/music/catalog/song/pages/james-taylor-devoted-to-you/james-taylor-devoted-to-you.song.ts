import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDevotedToYou = {
  id: "01a0b72f-2b63-78f6-82de-90cad5671396",
  type: "page-type/song",
  slug: "james-taylor-devoted-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "acf47e63-6343-391d-bb2d-e1428a1e67e7",
      externalLink: "https://musicbrainz.org/work/acf47e63-6343-391d-bb2d-e1428a1e67e7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Devoted to You",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
