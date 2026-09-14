import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftInvisible = {
  id: "019ea416-2cfc-7553-805f-ee247a9847f5",
  type: "song",
  slug: "taylor-swift-invisible",
  title: "Invisible",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f94238cb-8ca5-4e9d-a240-bb4df4b89a7f",
      externalLink: "https://musicbrainz.org/work/f94238cb-8ca5-4e9d-a240-bb4df4b89a7f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
