import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTrafficJam = {
  id: "01a0b72f-4da0-7676-8837-1a48096f5669",
  type: "page-type/song",
  slug: "james-taylor-traffic-jam",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6be27927-b0a9-4654-a47f-2694e226a601",
      externalLink: "https://musicbrainz.org/work/6be27927-b0a9-4654-a47f-2694e226a601",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Traffic Jam",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:05.728Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
