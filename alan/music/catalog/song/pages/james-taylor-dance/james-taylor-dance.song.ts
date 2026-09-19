import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDance = {
  id: "01a0b72f-28e0-7b14-b13f-474bca369596",
  type: "page-type/song",
  slug: "james-taylor-dance",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "867f5f92-315a-4653-baed-549847336a17",
      externalLink: "https://musicbrainz.org/work/867f5f92-315a-4653-baed-549847336a17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dance",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
