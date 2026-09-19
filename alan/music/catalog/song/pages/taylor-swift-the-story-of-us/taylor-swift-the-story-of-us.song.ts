import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheStoryOfUs = {
  id: "019ea416-3b79-7df2-bd3c-04bcb35c5512",
  type: "page-type/song",
  slug: "taylor-swift-the-story-of-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8bcf019-1b75-3c08-9207-41ffadc7c52d",
      externalLink: "https://musicbrainz.org/work/b8bcf019-1b75-3c08-9207-41ffadc7c52d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Story of Us",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
