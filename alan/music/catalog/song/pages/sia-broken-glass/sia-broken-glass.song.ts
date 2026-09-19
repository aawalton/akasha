import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBrokenGlass = {
  id: "019ea4c3-647f-7e59-814c-21b1d5038027",
  type: "page-type/song",
  slug: "sia-broken-glass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4511fdae-90af-4baf-88ef-00cf102b4a3f",
      externalLink: "https://musicbrainz.org/work/4511fdae-90af-4baf-88ef-00cf102b4a3f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Broken Glass",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
