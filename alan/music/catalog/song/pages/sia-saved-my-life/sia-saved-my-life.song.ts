import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSavedMyLife = {
  id: "019ea4ce-2360-7b95-b144-6fdef0effcd8",
  type: "page-type/song",
  slug: "sia-saved-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c986fab3-d026-4613-8765-62e0fb143065",
      externalLink: "https://musicbrainz.org/work/c986fab3-d026-4613-8765-62e0fb143065",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Saved My Life",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
