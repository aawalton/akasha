import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouReLosingMe = {
  id: "019ea416-468f-7909-9f63-6527a5a40cfa",
  type: "page-type/song",
  slug: "taylor-swift-you-re-losing-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c9232a3-34fd-4bee-99e9-41501dc92c63",
      externalLink: "https://musicbrainz.org/work/6c9232a3-34fd-4bee-99e9-41501dc92c63",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re Losing Me",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
