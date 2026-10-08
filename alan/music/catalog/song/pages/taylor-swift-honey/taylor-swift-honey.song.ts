import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHoney = {
  id: "019ea416-2393-78f7-9760-1526593c3e17",
  type: "page-type/song",
  slug: "taylor-swift-honey",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8b50ef71-cb37-4603-98f9-9bb8beabed1d",
      externalLink: "https://musicbrainz.org/work/8b50ef71-cb37-4603-98f9-9bb8beabed1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Honey",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:14.867Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
