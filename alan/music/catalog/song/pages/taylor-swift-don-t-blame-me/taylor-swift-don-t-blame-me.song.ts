import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDonTBlameMe = {
  id: "019ea416-073c-778b-ada4-fd172a48cb37",
  type: "page-type/song",
  slug: "taylor-swift-don-t-blame-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "40a50b24-f5fe-4a58-9b2a-9d1a8a179124",
      externalLink: "https://musicbrainz.org/work/40a50b24-f5fe-4a58-9b2a-9d1a8a179124",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Blame Me",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.612Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
