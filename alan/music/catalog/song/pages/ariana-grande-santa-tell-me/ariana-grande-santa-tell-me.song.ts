import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSantaTellMe = {
  id: "019ea4e5-23df-749a-a318-fd4f8d8f4bc9",
  type: "page-type/song",
  slug: "ariana-grande-santa-tell-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4e0a4288-95cf-4476-aa85-4ae21e80d8c2",
      externalLink: "https://musicbrainz.org/work/4e0a4288-95cf-4476-aa85-4ae21e80d8c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Tell Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:42:20.895Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
