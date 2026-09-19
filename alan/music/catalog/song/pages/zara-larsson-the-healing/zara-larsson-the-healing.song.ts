import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTheHealing = {
  id: "019ea4a1-9593-75f6-a4b1-c1a92e87d871",
  type: "page-type/song",
  slug: "zara-larsson-the-healing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbbc31f7-0946-415e-a530-7b97cc500e37",
      externalLink: "https://musicbrainz.org/work/cbbc31f7-0946-415e-a530-7b97cc500e37",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Healing",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
