import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIThinkHeKnows = {
  id: "019ea416-29f6-78de-bc79-ad8c9baa9289",
  type: "page-type/song",
  slug: "taylor-swift-i-think-he-knows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d311e17c-316e-4cff-a790-ce4b894aa47f",
      externalLink: "https://musicbrainz.org/work/d311e17c-316e-4cff-a790-ce4b894aa47f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Think He Knows",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
