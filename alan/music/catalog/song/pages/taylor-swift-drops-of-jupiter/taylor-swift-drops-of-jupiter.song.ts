import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDropsOfJupiter = {
  id: "019ea416-150a-775f-9de8-cac316cc4929",
  type: "page-type/song",
  slug: "taylor-swift-drops-of-jupiter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6373387-f4f4-4a0a-b025-2afcb8d2daab",
      externalLink: "https://musicbrainz.org/work/c6373387-f4f4-4a0a-b025-2afcb8d2daab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Drops of Jupiter",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
