import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLongLive2 = {
  id: "019ea416-27ee-7ce7-8892-2ac28ebb6d7d",
  type: "song",
  slug: "taylor-swift-long-live-2",
  title: "Long Live",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b21b4b0c-6f64-39ed-83f3-f4b218780780",
      externalLink: "https://musicbrainz.org/work/b21b4b0c-6f64-39ed-83f3-f4b218780780",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
