import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWinterBird = {
  id: "019ea4a5-ea1c-7395-96a4-ee3415f070c2",
  type: "page-type/song",
  slug: "aurora-winter-bird",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "78427908-793f-48d3-9874-b1baff6213d0",
      externalLink: "https://musicbrainz.org/work/78427908-793f-48d3-9874-b1baff6213d0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Bird",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
