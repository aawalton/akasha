import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCrazier = {
  id: "019ea416-1268-765e-99df-516f7f908fe0",
  type: "page-type/song",
  slug: "taylor-swift-crazier",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b238f13a-4209-3e28-a455-7143930e51d4",
      externalLink: "https://musicbrainz.org/work/b238f13a-4209-3e28-a455-7143930e51d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crazier",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
