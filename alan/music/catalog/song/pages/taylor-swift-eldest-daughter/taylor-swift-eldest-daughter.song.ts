import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEldestDaughter = {
  id: "019ea416-0efc-7213-b32f-654eaab8e452",
  type: "page-type/song",
  slug: "taylor-swift-eldest-daughter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "98422fdb-1856-43e3-b9be-3abe94a04435",
      externalLink: "https://musicbrainz.org/work/98422fdb-1856-43e3-b9be-3abe94a04435",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eldest Daughter",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
