import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeJustLookUp = {
  id: "019ea4e1-7e84-75a6-b77f-2bacc6bc113b",
  type: "page-type/song",
  slug: "ariana-grande-just-look-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6281e728-29f5-45b3-a466-c7fa96528d82",
      externalLink: "https://musicbrainz.org/work/6281e728-29f5-45b3-a466-c7fa96528d82",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Just Look Up",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
