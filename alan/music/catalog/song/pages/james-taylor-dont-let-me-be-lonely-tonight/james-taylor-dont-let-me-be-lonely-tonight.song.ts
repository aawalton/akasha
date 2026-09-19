import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDontLetMeBeLonelyTonight = {
  id: "01a0b72f-2b2d-7d56-b278-b7c699eb213c",
  type: "page-type/song",
  slug: "james-taylor-dont-let-me-be-lonely-tonight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "abcbee1b-63f8-3015-8a5f-28bafdc94d0a",
      externalLink: "https://musicbrainz.org/work/abcbee1b-63f8-3015-8a5f-28bafdc94d0a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Let Me Be Lonely Tonight",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
