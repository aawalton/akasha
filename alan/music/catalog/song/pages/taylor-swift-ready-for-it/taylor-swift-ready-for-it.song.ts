import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftReadyForIt = {
  id: "019ea416-16e1-7053-91cd-b90df8ccc980",
  type: "page-type/song",
  slug: "taylor-swift-ready-for-it",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "defd6853-e3a8-4197-8d85-04df567f78e2",
      externalLink: "https://musicbrainz.org/work/defd6853-e3a8-4197-8d85-04df567f78e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "…Ready for It?",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
