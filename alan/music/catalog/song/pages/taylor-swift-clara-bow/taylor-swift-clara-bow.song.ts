import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftClaraBow = {
  id: "019ea416-0cb9-755b-9eb7-fa233bfa866e",
  type: "page-type/song",
  slug: "taylor-swift-clara-bow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c7f12ee-2839-426e-85f9-992be6136a33",
      externalLink: "https://musicbrainz.org/work/7c7f12ee-2839-426e-85f9-992be6136a33",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clara Bow",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
