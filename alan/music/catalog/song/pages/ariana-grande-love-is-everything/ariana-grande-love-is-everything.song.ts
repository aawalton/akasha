import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLoveIsEverything = {
  id: "019ea4e3-30ce-7c3c-aecc-3e0d472d4b85",
  type: "page-type/song",
  slug: "ariana-grande-love-is-everything",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca535430-223d-4478-8558-0b8e73fddfa4",
      externalLink: "https://musicbrainz.org/work/ca535430-223d-4478-8558-0b8e73fddfa4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Is Everything",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
