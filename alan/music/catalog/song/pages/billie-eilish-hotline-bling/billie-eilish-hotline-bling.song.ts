import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHotlineBling = {
  id: "019ea4a8-8fd4-7ac0-83da-37c3c6f30af7",
  type: "page-type/song",
  slug: "billie-eilish-hotline-bling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1d6f5a61-e53b-4ac7-bd46-8557a0435347",
      externalLink: "https://musicbrainz.org/work/1d6f5a61-e53b-4ac7-bd46-8557a0435347",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hotline Bling",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
