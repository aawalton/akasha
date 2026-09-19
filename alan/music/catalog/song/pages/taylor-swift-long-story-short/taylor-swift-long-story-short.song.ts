import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLongStoryShort = {
  id: "019ea416-1bae-74e3-ab82-9b229debe23f",
  type: "page-type/song",
  slug: "taylor-swift-long-story-short",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27f7d619-abfd-4455-925c-82ff8d00c3f2",
      externalLink: "https://musicbrainz.org/work/27f7d619-abfd-4455-925c-82ff8d00c3f2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "long story short",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
