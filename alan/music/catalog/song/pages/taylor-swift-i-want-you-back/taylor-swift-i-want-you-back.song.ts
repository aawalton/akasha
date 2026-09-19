import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIWantYouBack = {
  id: "019ea416-249c-7c43-b7a4-b5b2e2c93ebd",
  type: "page-type/song",
  slug: "taylor-swift-i-want-you-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "958cb297-1409-32c1-ae48-54a425a17795",
      externalLink: "https://musicbrainz.org/work/958cb297-1409-32c1-ae48-54a425a17795",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Want You Back",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
