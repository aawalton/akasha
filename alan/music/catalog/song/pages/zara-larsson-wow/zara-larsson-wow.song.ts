import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWow = {
  id: "019ea4a2-28b8-741c-835a-35d4dea35421",
  type: "page-type/song",
  slug: "zara-larsson-wow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f7e4497b-a43e-4385-a344-7dd6bc70e320",
      externalLink: "https://musicbrainz.org/work/f7e4497b-a43e-4385-a344-7dd6bc70e320",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WOW",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
