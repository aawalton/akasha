import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSweetPotatoPie = {
  id: "01a0b72f-538a-7892-92d2-3ffd24c1f3a3",
  type: "page-type/song",
  slug: "james-taylor-sweet-potato-pie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bce6f263-220c-460a-9329-bbdc293ea2b2",
      externalLink: "https://musicbrainz.org/work/bce6f263-220c-460a-9329-bbdc293ea2b2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweet Potato Pie",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
