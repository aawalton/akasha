import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGoOn = {
  id: "019ea4c7-b1da-7fef-8a76-55a441851996",
  type: "page-type/song",
  slug: "sia-go-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4cbae07e-a0e9-4378-9c1e-ede2e63f7aad",
      externalLink: "https://musicbrainz.org/work/4cbae07e-a0e9-4378-9c1e-ede2e63f7aad",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Go On",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
