import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheBully = {
  id: "019ea4ca-9674-78a7-aca6-7e7812d24e2b",
  type: "page-type/song",
  slug: "sia-the-bully",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05c6307f-e6b2-389b-968e-526777a7fbae",
      externalLink: "https://musicbrainz.org/work/05c6307f-e6b2-389b-968e-526777a7fbae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Bully",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
