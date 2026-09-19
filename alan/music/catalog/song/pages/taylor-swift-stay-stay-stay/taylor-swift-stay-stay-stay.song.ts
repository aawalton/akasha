import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftStayStayStay = {
  id: "019ea416-3b45-774e-b4d8-a1eedc20ea06",
  type: "page-type/song",
  slug: "taylor-swift-stay-stay-stay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5543961-407d-4a07-a96a-b0d8cbf5b5f1",
      externalLink: "https://musicbrainz.org/work/b5543961-407d-4a07-a96a-b0d8cbf5b5f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stay Stay Stay",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
