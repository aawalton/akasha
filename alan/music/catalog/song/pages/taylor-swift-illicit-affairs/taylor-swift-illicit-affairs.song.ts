import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIllicitAffairs = {
  id: "019ea416-258c-7e18-9057-e9d2144367f6",
  type: "page-type/song",
  slug: "taylor-swift-illicit-affairs",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ed14afd-649f-4094-8106-8bd0984cadd7",
      externalLink: "https://musicbrainz.org/work/9ed14afd-649f-4094-8106-8bd0984cadd7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "illicit affairs",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:15.372Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
