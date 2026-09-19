import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWildOne2 = {
  id: "019ea4cb-614d-7237-baf1-e2a091f5d377",
  type: "page-type/song",
  slug: "sia-wild-one-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27c2baeb-9bf5-4643-bc28-8f22ab068b1d",
      externalLink: "https://musicbrainz.org/work/27c2baeb-9bf5-4643-bc28-8f22ab068b1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wild One 2",
  artist: "artist/sia",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
