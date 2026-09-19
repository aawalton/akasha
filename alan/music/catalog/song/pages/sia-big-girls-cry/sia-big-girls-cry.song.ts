import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBigGirlsCry = {
  id: "019ea4c3-253d-71c5-80c3-406c878b1089",
  type: "page-type/song",
  slug: "sia-big-girls-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27fb7c8f-6a0f-4974-8350-e9205edcdc86",
      externalLink: "https://musicbrainz.org/work/27fb7c8f-6a0f-4974-8350-e9205edcdc86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Big Girls Cry",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
