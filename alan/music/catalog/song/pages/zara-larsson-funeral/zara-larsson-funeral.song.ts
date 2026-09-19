import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonFuneral = {
  id: "019ea49d-d0b2-7e70-ba8c-706d15fe1221",
  type: "page-type/song",
  slug: "zara-larsson-funeral",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "095132b8-0dbc-4b1b-a2a8-13148d786a96",
      externalLink: "https://musicbrainz.org/work/095132b8-0dbc-4b1b-a2a8-13148d786a96",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Funeral",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
