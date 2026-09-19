import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBackToDecember = {
  id: "019ea416-0460-7fe0-a279-ea4d2edf91b0",
  type: "page-type/song",
  slug: "taylor-swift-back-to-december",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "228cd62c-2a8f-3aa9-b4d4-6d4ee76f5daf",
      externalLink: "https://musicbrainz.org/work/228cd62c-2a8f-3aa9-b4d4-6d4ee76f5daf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Back to December",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
