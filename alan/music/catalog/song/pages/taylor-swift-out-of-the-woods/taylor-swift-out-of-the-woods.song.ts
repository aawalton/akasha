import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOutOfTheWoods = {
  id: "019ea416-2fb4-74ae-b45f-d0c33c04a27a",
  type: "page-type/song",
  slug: "taylor-swift-out-of-the-woods",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1e459e1f-65f0-4e88-94a5-e7c530b11dc9",
      externalLink: "https://musicbrainz.org/work/1e459e1f-65f0-4e88-94a5-e7c530b11dc9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Out of the Woods",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
