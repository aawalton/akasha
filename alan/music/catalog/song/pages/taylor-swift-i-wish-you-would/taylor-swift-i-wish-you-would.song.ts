import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIWishYouWould = {
  id: "019ea416-2052-7448-88b1-4361f2076ac7",
  type: "page-type/song",
  slug: "taylor-swift-i-wish-you-would",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "698a8b54-c881-4f70-a7a7-599c8a85523b",
      externalLink: "https://musicbrainz.org/work/698a8b54-c881-4f70-a7a7-599c8a85523b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Wish You Would",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
