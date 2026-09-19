import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMyFavoritePart = {
  id: "019ea4e7-7240-7f39-855b-9c4e90b77c70",
  type: "page-type/song",
  slug: "ariana-grande-my-favorite-part",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5175673-e2e2-4fbe-b8c3-0038a6bb72eb",
      externalLink: "https://musicbrainz.org/work/c5175673-e2e2-4fbe-b8c3-0038a6bb72eb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Favorite Part",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
