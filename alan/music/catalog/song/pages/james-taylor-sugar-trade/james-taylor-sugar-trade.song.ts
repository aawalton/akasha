import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSugarTrade = {
  id: "01a0b72f-50ad-78fe-b351-da2d3c964ef1",
  type: "page-type/song",
  slug: "james-taylor-sugar-trade",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "911c8fca-cf14-4eae-b697-ae48c2f8da4c",
      externalLink: "https://musicbrainz.org/work/911c8fca-cf14-4eae-b697-ae48c2f8da4c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sugar Trade",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
