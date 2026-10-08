import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHitsDifferent = {
  id: "019ea416-2754-79ee-89a2-245426719948",
  type: "page-type/song",
  slug: "taylor-swift-hits-different",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a7b2ac6e-de04-469e-b983-6d6e79bd1c15",
      externalLink: "https://musicbrainz.org/work/a7b2ac6e-de04-469e-b983-6d6e79bd1c15",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hits Different",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:15.828Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
